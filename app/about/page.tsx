import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'About Us | Rapid SoftTech Solutions',
  description: 'Meet the team behind Rapid SoftTech Solutions. We help businesses grow with high-converting websites and web apps.',
  keywords: ['about agency', 'website development company', 'web app agency', 'business growth websites'],
  openGraph: {
    title: 'About Us | Rapid SoftTech Solutions',
    description: 'A software team focused on helping businesses get more customers online.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] py-20 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">About Our Agency</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-blue-100">
            We are a software team helping businesses grow through better websites, stronger online presence, and conversion-focused digital experiences.
          </p>
        </div>
      </section>

      <AnimatedSection className="py-16 sm:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          <div className="agency-card">
            <h2 className="text-3xl font-bold text-slate-900">Who We Are</h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Rapid SoftTech Solutions is a growth-driven web agency. We work with startups, local businesses, and service brands that want to look professional online and get more customers.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Our team combines design clarity, clear messaging, and user-friendly experiences so every website becomes a real business asset.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="agency-card text-center">
              <p className="text-4xl font-bold text-[#2563EB]">150+</p>
              <p className="mt-2 text-slate-600">Projects Completed</p>
            </div>
            <div className="agency-card text-center">
              <p className="text-4xl font-bold text-[#7C3AED]">95+</p>
              <p className="mt-2 text-slate-600">Clients Served</p>
            </div>
            <div className="agency-card text-center sm:col-span-2">
              <p className="text-lg font-semibold text-slate-900">Focused on Results</p>
              <p className="mt-2 text-slate-600">Our work is measured by lead quality, conversions, and long-term business growth.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-8 sm:py-12">
        <div className="container-custom grid gap-6 md:grid-cols-2">
          <div className="agency-card">
            <h3 className="text-2xl font-bold text-slate-900">Mission</h3>
            <p className="mt-4 text-slate-600">
              To help businesses attract more customers online through modern websites and web apps built for performance and trust.
            </p>
          </div>
          <div className="agency-card">
            <h3 className="text-2xl font-bold text-slate-900">Vision</h3>
            <p className="mt-4 text-slate-600">
              To become the go-to growth partner for businesses that want a stronger digital brand and consistent lead generation.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="pb-20 pt-10">
        <div className="container-custom">
          <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white">
            <h2 className="text-3xl font-bold">Ready to Grow Your Business Online?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Let&apos;s create a website that makes your brand stand out and converts visitors into real customers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary px-6 py-3">
                Get Free Consultation
              </Link>
              <Link href="/services" className="btn-secondary px-6 py-3 bg-white/95">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
      <WhatsAppFloat />
      </div>
  );
}
