'use client';

import { useState } from 'react';
import api from '@/lib/api';
import type { RenewSubscriptionDto } from '@/types';

interface RenewSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  library: {
    id: string;
    library_name: string;
    email: string;
    subscription_end?: Date | string;
  };
  onSuccess: () => void;
}

// Pricing structure with 3 tiers
const PLAN_TIERS = {
  BASIC: {
    name: 'Basic',
    monthly: 799,
    features: [
      'Up to 50 members',
      'No website included',
      'Email receipts',
      'Simple reports (PDF/Excel)',
      'Email support only',
    ],
  },
  STANDARD: {
    name: 'Standard',
    monthly: 1199,
    features: [
      'Up to 70 members',
      '1-page website (on our domain)',
      '2 reports (payments, expired students)',
      'Email receipts',
      'WhatsApp chat support',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    monthly: 1999,
    features: [
      'Up to 200 members',
      '5-page website with custom domain',
      'Student QR ID Cards',
      'QR-based attendance (IN/OUT scan)',
      'Detailed analytics dashboard',
      'Data export & backup',
      '24/7 support — Call + WhatsApp',
    ],
  },
};

// Discount structure: 3% for 3 months, 6% for 6 months, 10% for 12 months
const DISCOUNTS = {
  1: 0,
  3: 0.03,
  6: 0.06,
  12: 0.10,
};

const calculatePrice = (tier: 'BASIC' | 'STANDARD' | 'PREMIUM', duration: 1 | 3 | 6 | 12): number => {
  const monthlyPrice = PLAN_TIERS[tier].monthly;
  const totalBeforeDiscount = monthlyPrice * duration;
  const discount = DISCOUNTS[duration];
  return Math.round(totalBeforeDiscount * (1 - discount));
};

export default function RenewSubscriptionModal({
  isOpen,
  onClose,
  library,
  onSuccess,
}: RenewSubscriptionModalProps) {
  const [selectedTier, setSelectedTier] = useState<'BASIC' | 'STANDARD' | 'PREMIUM'>('STANDARD');
  const [formData, setFormData] = useState({
    plan_duration: 1 as 1 | 3 | 6 | 12,
    amount: calculatePrice('STANDARD', 1),
    payment_method: 'UPI',
    payment_date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTierChange = (tier: 'BASIC' | 'STANDARD' | 'PREMIUM') => {
    setSelectedTier(tier);
    setFormData({
      ...formData,
      amount: calculatePrice(tier, formData.plan_duration),
    });
  };

  const handlePlanChange = (duration: 1 | 3 | 6 | 12) => {
    setFormData({
      ...formData,
      plan_duration: duration,
      amount: calculatePrice(selectedTier, duration),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload: RenewSubscriptionDto = {
        tenant_id: library.id,
        amount: formData.amount,
        plan_duration: formData.plan_duration,
        payment_method: formData.payment_method,
        payment_date: formData.payment_date,
        notes: formData.notes || undefined,
      };

      await api.post('/superadmin/subscriptions/renew', payload);
      
      // Reset form
      setSelectedTier('STANDARD');
      setFormData({
        plan_duration: 1,
        amount: calculatePrice('STANDARD', 1),
        payment_method: 'UPI',
        payment_date: new Date().toISOString().split('T')[0],
        notes: '',
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to renew subscription');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">💰 Renew Subscription</h2>
              <p className="text-purple-100 mt-1">{library.library_name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
              disabled={submitting}
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Library Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Library:</span>
                <span className="ml-2 font-semibold">{library.library_name}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-semibold">{library.email}</span>
              </div>
              {library.subscription_end && (
                <div className="md:col-span-2">
                  <span className="text-gray-600">Current End Date:</span>
                  <span className="ml-2 font-semibold text-orange-600">
                    {new Date(library.subscription_end).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Plan Tier Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Plan Tier <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.keys(PLAN_TIERS) as Array<keyof typeof PLAN_TIERS>).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => handleTierChange(tier)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTier === tier
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-300 hover:border-purple-300'
                  }`}
                >
                  <div className="font-bold text-lg text-gray-900 mb-2">
                    {PLAN_TIERS[tier].name}
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-3">
                    ₹{PLAN_TIERS[tier].monthly}
                    <span className="text-sm text-gray-500 font-normal">/month</span>
                  </div>
                  <ul className="space-y-1.5">
                    {PLAN_TIERS[tier].features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="text-green-500 mr-1.5 mt-0.5">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          {/* Plan Duration Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Duration <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {([1, 3, 6, 12] as const).map((duration) => {
                const price = calculatePrice(selectedTier, duration);
                const discount = DISCOUNTS[duration];
                const savings = duration > 1 ? Math.round(PLAN_TIERS[selectedTier].monthly * duration - price) : 0;
                
                return (
                  <button
                    key={duration}
                    type="button"
                    onClick={() => handlePlanChange(duration)}
                    className={`p-4 rounded-lg border-2 transition-all relative ${
                      formData.plan_duration === duration
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    {discount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {Math.round(discount * 100)}% OFF
                      </div>
                    )}
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900">
                        {duration} {duration === 1 ? 'Month' : 'Months'}
                      </div>
                      <div className="text-sm text-purple-600 font-semibold mt-1">
                        ₹{price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        ₹{Math.round(price / duration)}/mo
                      </div>
                      {savings > 0 && (
                        <div className="text-xs text-green-600 font-semibold mt-1">
                          Save ₹{savings}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              className="input-field"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Suggested: ₹{calculatePrice(selectedTier, formData.plan_duration).toLocaleString()} 
              ({PLAN_TIERS[selectedTier].name} - {formData.plan_duration} month{formData.plan_duration > 1 ? 's' : ''})
              {DISCOUNTS[formData.plan_duration] > 0 && 
                ` with ${Math.round(DISCOUNTS[formData.plan_duration] * 100)}% discount`
              }
            </p>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.payment_method}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              className="input-field"
              required
            >
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Cheque">Cheque</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.payment_date}
              onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              className="input-field"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any notes about this payment..."
              className="input-field"
              rows={3}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2">📋 Renewal Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold">{PLAN_TIERS[selectedTier].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">
                  {formData.plan_duration} {formData.plan_duration === 1 ? 'Month' : 'Months'}
                </span>
              </div>
              {DISCOUNTS[formData.plan_duration] > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-semibold text-red-600">
                    {Math.round(DISCOUNTS[formData.plan_duration] * 100)}% 
                    (-₹{Math.round(PLAN_TIERS[selectedTier].monthly * formData.plan_duration - calculatePrice(selectedTier, formData.plan_duration))})
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-green-600">₹{formData.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="font-semibold">{formData.payment_method}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-green-300">
              <p className="text-xs text-gray-600">
                ✅ Subscription will be extended by {formData.plan_duration} month(s)
              </p>
              <p className="text-xs text-gray-600">
                ✅ Receipt will be automatically sent to {library.email}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Processing...' : '💳 Renew & Send Receipt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
