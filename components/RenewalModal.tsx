'use client';

import { useEffect, useRef, useState } from 'react';
import type { RenewalCandidate, Plan } from '@/types';

interface RenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (planId: string, amountPaid?: number, oldPendingFeesPayment?: number) => void;
  member: RenewalCandidate | null;
  plans: Plan[];
  loading: boolean;
}

export default function RenewalModal({
  isOpen,
  onClose,
  onConfirm,
  member,
  plans,
  loading,
}: RenewalModalProps) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  // Payment fields
  const [oldPendingFeesPayment, setOldPendingFeesPayment] = useState(0);
  const [renewalAmountPaid, setRenewalAmountPaid] = useState(0);
  const [isPartialPayment, setIsPartialPayment] = useState(false);

  const oldPendingFees = member?.remaining_fees ? Number(member.remaining_fees) : 0;

  useEffect(() => {
    if (isOpen && plans.length > 0) {
      // Select first plan by default
      const defaultPlan = member?.plan_id 
        ? plans.find(p => p.id === member.plan_id) || plans[0]
        : plans[0];
      setSelectedPlanId(defaultPlan.id);
      setSelectedPlan(defaultPlan);
      
      // Reset payment fields
      setOldPendingFeesPayment(0);
      setRenewalAmountPaid(Number(defaultPlan.price));
      setIsPartialPayment(false);
    }
  }, [isOpen, plans, member]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, loading, onClose]);

  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId);
    const plan = plans.find((p) => p.id === planId);
    setSelectedPlan(plan || null);
    
    // Reset renewal amount to full price when plan changes
    if (plan && !isPartialPayment) {
      setRenewalAmountPaid(Number(plan.price));
    }
  };

  const calculateNewDates = () => {
    if (!member || !selectedPlan) return { newStart: null, newEnd: null };

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const memberEndDate = new Date(member.end_date);
    memberEndDate.setUTCHours(0, 0, 0, 0);

    let newStart: Date;
    let newEnd: Date;

    if (member.status === 'EXPIRED' || memberEndDate < today) {
      // Member is expired
      newStart = new Date(today);
      newEnd = new Date(today);
      newEnd.setUTCDate(newEnd.getUTCDate() + selectedPlan.duration_days);
    } else {
      // Member is active
      newStart = new Date(memberEndDate);
      newStart.setUTCDate(newStart.getUTCDate() + 1);
      newEnd = new Date(newStart);
      newEnd.setUTCDate(newEnd.getUTCDate() + selectedPlan.duration_days);
    }

    return { newStart, newEnd };
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const { newStart, newEnd } = calculateNewDates();
  const totalDuration = selectedPlan?.duration_days || 0;

  if (!isOpen || !member) return null;

  const isExpired = member.status === 'EXPIRED';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={!loading ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="renewal-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 id="renewal-modal-title" className="text-xl font-semibold text-gray-900">
            Renew Membership
          </h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

          {/* Member Details */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Member Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>{' '}
              <span className="font-medium text-gray-900">{member.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>{' '}
              <span className="font-medium text-gray-900">{member.phone}</span>
            </div>
            <div>
              <span className="text-gray-600">Current Plan:</span>{' '}
              <span className="font-medium text-gray-900">{member.plan?.name || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600">Current End Date:</span>{' '}
              <span className="font-medium text-gray-900">
                {formatDate(new Date(member.end_date))}
              </span>
            </div>
          </div>
          
          {/* Pending Fees Alert */}
          {oldPendingFees > 0 && (
            <div className="mt-3 bg-orange-50 border border-orange-200 text-orange-700 px-3 py-2 rounded text-sm">
              💰 <strong>Pending Fees: ₹{oldPendingFees.toFixed(2)}</strong>
              <p className="mt-1 text-xs">Member has unpaid fees from previous period. You can collect them during renewal.</p>
            </div>
          )}
          
          {isExpired ? (
            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              ⚠️ Membership expired on {formatDate(new Date(member.end_date))}
            </div>
          ) : (
            <div className="mt-3 bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-2 rounded text-sm">
              ℹ️ Membership expires on {formatDate(new Date(member.end_date))}
            </div>
          )}
        </div>        {/* Plan Selection */}
        <div className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Select New Plan</h4>
          <select
            value={selectedPlanId}
            onChange={(e) => handlePlanChange(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            aria-label="Select plan for renewal"
          >
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - {plan.duration_days} days - ₹{plan.price}
              </option>
            ))}
          </select>

          {/* Selected Plan Preview */}
          {selectedPlan && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-2">Plan Details</h5>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-blue-700">Name:</span>{' '}
                  <span className="font-medium text-blue-900">{selectedPlan.name}</span>
                </div>
                <div>
                  <span className="text-blue-700">Duration:</span>{' '}
                  <span className="font-medium text-blue-900">{selectedPlan.duration_days} days</span>
                </div>
                <div>
                  <span className="text-blue-700">Price:</span>{' '}
                  <span className="font-medium text-blue-900">₹{selectedPlan.price}</span>
                </div>
                {selectedPlan.benefits && (
                  <div>
                    <span className="text-blue-700">Benefits:</span>{' '}
                    <p className="text-blue-900 mt-1 whitespace-pre-line">{selectedPlan.benefits}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payment Section */}
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h5 className="font-semibold text-purple-900 mb-3">Payment Details</h5>
            
            {/* Old Pending Fees Payment */}
            {oldPendingFees > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  Collect Old Pending Fees (₹{oldPendingFees.toFixed(2)})
                </label>
                <input
                  type="number"
                  min="0"
                  max={oldPendingFees}
                  step="0.01"
                  value={oldPendingFeesPayment}
                  onChange={(e) => setOldPendingFeesPayment(Math.min(oldPendingFees, Math.max(0, Number(e.target.value))))}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  placeholder="Enter amount to collect"
                />
                <p className="text-xs text-purple-600 mt-1">
                  Remaining old fees: ₹{(oldPendingFees - oldPendingFeesPayment).toFixed(2)}
                </p>
              </div>
            )}

            {/* Renewal Payment Options */}
            <div className="mb-3">
              <label className="flex items-center text-sm font-medium text-purple-700 mb-2">
                <input
                  type="checkbox"
                  checked={isPartialPayment}
                  onChange={(e) => {
                    setIsPartialPayment(e.target.checked);
                    if (!e.target.checked && selectedPlan) {
                      setRenewalAmountPaid(Number(selectedPlan.price));
                    }
                  }}
                  disabled={loading}
                  className="mr-2"
                />
                Enable Partial Payment for Renewal
              </label>
            </div>

            {/* Renewal Amount Input */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-purple-700 mb-2">
                Renewal Payment Amount
              </label>
              <input
                type="number"
                min="0"
                max={selectedPlan ? Number(selectedPlan.price) : 0}
                step="0.01"
                value={renewalAmountPaid}
                onChange={(e) => {
                  const value = Math.min(
                    selectedPlan ? Number(selectedPlan.price) : 0,
                    Math.max(0, Number(e.target.value))
                  );
                  setRenewalAmountPaid(value);
                }}
                disabled={loading || !isPartialPayment}
                className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:bg-gray-100"
                placeholder="Enter renewal payment"
              />
              {!isPartialPayment && (
                <p className="text-xs text-purple-600 mt-1">Full payment required (₹{selectedPlan?.price})</p>
              )}
              {isPartialPayment && selectedPlan && (
                <p className="text-xs text-purple-600 mt-1">
                  Remaining renewal fees: ₹{(Number(selectedPlan.price) - renewalAmountPaid).toFixed(2)}
                </p>
              )}
            </div>

            {/* Payment Summary */}
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <h6 className="text-sm font-semibold text-purple-900 mb-2">Payment Summary</h6>
              <div className="space-y-1 text-sm">
                {oldPendingFees > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Old Pending Fees Payment:</span>
                      <span className="font-medium text-purple-900">₹{oldPendingFeesPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Remaining Old Fees:</span>
                      <span className="font-medium text-purple-900">₹{(oldPendingFees - oldPendingFeesPayment).toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-purple-700">Renewal Payment:</span>
                  <span className="font-medium text-purple-900">₹{renewalAmountPaid.toFixed(2)}</span>
                </div>
                {selectedPlan && renewalAmountPaid < Number(selectedPlan.price) && (
                  <div className="flex justify-between">
                    <span className="text-purple-700">Renewal Remaining:</span>
                    <span className="font-medium text-orange-600">₹{(Number(selectedPlan.price) - renewalAmountPaid).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-purple-200">
                  <span className="text-purple-700 font-semibold">Total Collecting Now:</span>
                  <span className="font-bold text-purple-900">₹{(oldPendingFeesPayment + renewalAmountPaid).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700 font-semibold">Total Pending After:</span>
                  <span className={`font-bold ${
                    (oldPendingFees - oldPendingFeesPayment + (selectedPlan ? Number(selectedPlan.price) : 0) - renewalAmountPaid) > 0 
                      ? 'text-orange-600' 
                      : 'text-green-600'
                  }`}>
                    ₹{(oldPendingFees - oldPendingFeesPayment + (selectedPlan ? Number(selectedPlan.price) : 0) - renewalAmountPaid).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* New Membership Period */}
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h5 className="font-semibold text-green-900 mb-2">New Membership Period</h5>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-green-700">New Start Date:</span>{' '}
                <span className="font-medium text-green-900">{formatDate(newStart)}</span>
              </div>
              <div>
                <span className="text-green-700">New End Date:</span>{' '}
                <span className="font-medium text-green-900">{formatDate(newEnd)}</span>
              </div>
              <div>
                <span className="text-green-700">Total Duration:</span>{' '}
                <span className="font-medium text-green-900">{totalDuration} days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            ref={confirmButtonRef}
            onClick={() => onConfirm(selectedPlanId, renewalAmountPaid, oldPendingFeesPayment)}
            disabled={loading || !selectedPlanId}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Processing...
              </span>
            ) : (
              'Confirm Renewal'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
