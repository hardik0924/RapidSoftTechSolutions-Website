import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rapid SoftTech Solutions',
    url: 'https://www.rapidsofttechsolutions.app',
    logo: 'https://www.rapidsofttechsolutions.app/logo.png',
    description: 'We build websites and web apps that help businesses attract customers and increase revenue.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [
      // Add your social media links here when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'rapidsofttechsolutions@gmail.com',
    },
  };

  const services = [
    {
      title: 'Website Development',
      description: 'Conversion-focused websites that turn visitors into paying customers.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.75 4.5h16.5v15h-16.5zM3.75 8.25h16.5" />
      ),
    },
    {
      title: 'E-commerce Websites',
      description: 'Online stores built to increase orders, trust, and repeat purchases.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 3.75h2.25L7.5 15h9.75l2.25-8.25H6.75M9.75 19.5a.75.75 0 100 1.5.75.75 0 000-1.5zm7.5 0a.75.75 0 100 1.5.75.75 0 000-1.5z" />
      ),
    },
    {
      title: 'Custom Web Applications',
      description: 'Smart business tools that streamline daily work and boost productivity.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4.5 5.25A2.25 2.25 0 016.75 3h10.5a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0117.25 21H6.75a2.25 2.25 0 01-2.25-2.25V5.25z" />
      ),
    },
    {
      title: 'UI/UX Design',
      description: 'Clean, user-friendly design experiences that improve conversion rates.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 3v18m9-9H3" />
      ),
    },
    {
      title: 'SEO Optimization',
      description: 'Better visibility on Google so your ideal customers find you faster.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM15.5 15.5l5 5" />
      ),
    },
    {
      title: 'Website Maintenance',
      description: 'Ongoing support to keep your website fast, secure, and updated.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11.25 3.75h1.5v4.5h-1.5zM11.25 15.75h1.5v4.5h-1.5zM3.75 11.25h4.5v1.5h-4.5zM15.75 11.25h4.5v1.5h-4.5z" />
      ),
    },
  ];

  const testimonials = [
    {
      name: 'Aman Gupta',
      role: 'Founder, Prime Dental Clinic',
      quote: 'Our new website started generating quality leads within the first month. Great communication and smooth delivery.',
    },
    {
      name: 'Neha Sharma',
      role: 'Owner, Urban Fashion Cart',
      quote: 'They helped us launch a beautiful online store that increased monthly sales and improved customer trust.',
    },
    {
      name: 'Rahul Patil',
      role: 'Director, EduBridge Academy',
      quote: 'Very professional team. The website is fast, mobile-friendly, and easy for our team to manage.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />

        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-sky-50 via-white to-violet-100 py-16 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.12),transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(124,58,237,0.14),transparent_40%)]" />
          <div className="container-custom relative">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <AnimatedSection>
                <p className="inline-flex rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-[#2563EB]">
                  Modern Agency for Growth-Focused Businesses
                </p>
                <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                  Build a Website That Grows Your Business 🚀
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                  We design and develop modern, high-performing websites that help you attract customers and increase revenue.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary px-7 py-3">
                    Get Free Consultation
                  </Link>
                  <Link href="/services" className="btn-secondary px-7 py-3">
                    View Services
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="relative mx-auto max-w-xl">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-300/40">
                    <div className="mb-3 flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-400" />
                      <span className="h-3 w-3 rounded-full bg-amber-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-6 text-white">
                      <p className="text-sm uppercase tracking-widest text-blue-100">Agency Website Preview</p>
                      <h3 className="mt-4 text-2xl font-bold">More Leads. Better Conversions.</h3>
                      <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                        <div className="rounded-lg bg-white/20 p-3">Mobile First</div>
                        <div className="rounded-lg bg-white/20 p-3">SEO Ready</div>
                        <div className="rounded-lg bg-white/20 p-3">Fast Load</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -left-8 w-40 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
                    <div className="mb-3 h-2 w-16 rounded-full bg-slate-200" />
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-sky-200" />
                      <div className="h-2 w-3/4 rounded-full bg-violet-200" />
                      <div className="h-2 w-5/6 rounded-full bg-cyan-200" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <AnimatedSection id="services" className="py-16 sm:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="agency-section-title">Services Built for Business Growth</h2>
              <p className="agency-section-subtitle">Everything you need to launch, improve, and scale your online presence.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="agency-card">
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] p-3 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {service.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-slate-600">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-16 sm:py-20">
          <div className="container-custom">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-xl shadow-slate-200/60 sm:px-10">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Why Choose Us</span>
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {['Fast Delivery', 'Mobile Responsive', 'SEO Friendly', 'Affordable Pricing', 'Secure & Scalable'].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 px-4 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                    <p className="font-semibold text-slate-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="products" className="py-16 sm:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="agency-section-title">Our Products</h2>
              <p className="agency-section-subtitle">Along with client services, we also build focused software products.</p>
            </div>
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="agency-card rounded-3xl border-violet-100 bg-gradient-to-br from-white to-violet-50">
                <div className="flex items-center gap-4">
                  <img src="/rapidlibrary360-logo.png" alt="RapidLibrary360" className="h-14 w-14 rounded-xl" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">RapidLibrary360</h3>
                    <p className="text-slate-600">A complete library management system</p>
                  </div>
                </div>
                <Link href="/rapidlibrary360" className="btn-primary mt-6 inline-flex px-6 py-3">
                  View Product
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-16 sm:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="agency-section-title">Our Process</h2>
              <p className="agency-section-subtitle">A clear 4-step workflow that keeps your project simple and on track.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-4">
              {['Requirement Discussion', 'Design', 'Development', 'Launch'].map((step, index) => (
                <div key={step} className="agency-card text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{step}</h3>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-16 sm:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="agency-section-title">What Clients Say</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.name} className="agency-card">
                  <p className="text-slate-600">“{testimonial.quote}”</p>
                  <footer className="mt-5">
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="pb-20 pt-10">
          <div className="container-custom">
            <div className="rounded-3xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-6 py-12 text-center text-white sm:px-12">
              <h2 className="text-3xl font-bold sm:text-4xl">Let&apos;s Build Your Website Today</h2>
              <p className="mx-auto mt-4 max-w-2xl text-blue-100">
                Start with a free consultation and get a clear plan to grow your business online.
              </p>
              <Link href="/contact" className="mt-8 inline-flex rounded-xl bg-white px-7 py-3 font-bold text-[#2563EB] transition hover:bg-slate-100">
                Get Started
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
}
