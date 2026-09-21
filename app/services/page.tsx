import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Services | Rapid SoftTech Solutions',
  description:
    'Explore our website and web app services designed to get more customers, increase conversions, and grow your business.',
};

const services = [
  {
    title: 'Website Development',
    description:
      'Business websites designed to build trust and convert visitors into enquiries.',
    features: ['Custom design', 'Mobile responsive', 'Lead-focused layout'],
  },
  {
    title: 'E-commerce Websites',
    description:
      'Online stores built for better product discovery, checkout flow, and repeat sales.',
    features: ['Product pages', 'Cart and checkout', 'Order-ready setup'],
  },
  {
    title: 'Custom Web Applications',
    description:
      'Tailored business portals that simplify your daily operations and customer experience.',
    features: ['Workflow-focused UI', 'Role-based panels', 'Business-ready dashboards'],
  },
  {
    title: 'UI/UX Design',
    description:
      'High-converting design systems and interfaces focused on clarity and action.',
    features: ['Wireframes', 'UI design', 'Conversion-friendly sections'],
  },
  {
    title: 'SEO Optimization',
    description:
      'Improve your visibility on search engines and attract high-intent leads.',
    features: ['On-page SEO', 'Content structure', 'Local SEO setup'],
  },
  {
    title: 'Website Maintenance',
    description:
      'Keep your website secure, updated, and performing at its best every month.',
    features: ['Monthly updates', 'Security checks', 'Performance monitoring'],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] py-16 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Services That Drive Growth</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-100">
            From business websites to custom web apps, we build digital experiences that help you get more customers and increase conversions.
          </p>
        </div>
      </section>

      <AnimatedSection className="py-14 sm:py-16">
        <div className="container-custom grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="agency-card">
              <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
              <p className="mt-3 text-slate-600">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="pb-20 pt-8">
        <div className="container-custom">
          <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white">
            <h2 className="text-3xl font-bold">Need Help Choosing the Right Service?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Book a free consultation and get a tailored recommendation for your business goals and budget.
            </p>
            <Link href="/contact" className="btn-primary mt-8 inline-flex px-6 py-3">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
