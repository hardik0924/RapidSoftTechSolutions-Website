'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import AnimatedSection from '@/components/AnimatedSection';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || 'Failed to send consultation request.');
      }

      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        businessType: '',
        message: '',
      });
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send consultation request.');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] py-16 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Get Free Consultation</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Tell us about your business goals and we&apos;ll recommend the right website solution.
          </p>
        </div>
      </section>

      <AnimatedSection className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
            <div className="agency-card">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Tell Us About Your Project</h2>
            
            {status === 'success' && (
              <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-700">
                Thank you. Your consultation request has been sent successfully.
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
                {errorMessage || 'Something went wrong. Please try again or message us on WhatsApp.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="businessType" className="mb-1 block text-sm font-medium text-slate-700">
                  Business Type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  required
                  value={formData.businessType}
                  onChange={handleChange}
                  className="input-base"
                >
                  <option value="">Select business type</option>
                  <option value="local-business">Local Business</option>
                  <option value="startup">Startup</option>
                  <option value="service-company">Service Company</option>
                  <option value="ecommerce">E-commerce Brand</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="input-base"
                  placeholder="Share your goals and what you want your new website to achieve..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full py-3"
              >
                {status === 'sending' ? 'Sending...' : 'Get Free Consultation'}
              </button>
            </form>
            </div>

            <div className="space-y-6">
              <div className="agency-card">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Direct Contact</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a href="mailto:rapidsofttechsolutions@gmail.com" className="text-[#2563EB] hover:underline">
                      rapidsofttechsolutions@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5.25a2.25 2.25 0 012.25-2.25h2.379c1.035 0 1.93.707 2.169 1.714l.617 2.603a2.25 2.25 0 01-.974 2.437l-1.311.875a12.035 12.035 0 005.916 5.916l.874-1.312a2.25 2.25 0 012.438-.974l2.603.617A2.25 2.25 0 0121 16.37v2.38A2.25 2.25 0 0118.75 21h-.75C9.716 21 3 14.284 3 6v-.75z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone & WhatsApp</h3>
                    <a href="tel:+917276152913" className="text-[#2563EB] hover:underline">+91 7276152913</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25V6A2.25 2.25 0 0018.75 3.75H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-2.25M12 9.75h.008v.008H12V9.75zm0 4.5h.008v.008H12v-.008zm0 4.5h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-slate-600">
                      Monday - Saturday<br />
                      9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
              </div>

              <div className="agency-card bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white">
                <h3 className="text-2xl font-bold">Need a Faster Response?</h3>
                <p className="mt-2 text-blue-100">Chat directly with us on WhatsApp to discuss your project instantly.</p>
                <a
                  href="https://wa.me/917276152913?text=Hi%2C%20I%20need%20a%20website%20for%20my%20business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-[#2563EB]"
                >
                  Start WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
