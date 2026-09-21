import type { Metadata, Viewport } from 'next';
import { Manrope, Sora } from 'next/font/google';
import Script from 'next/script';
import '@/app/globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-body' });
const sora = Sora({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Rapid SoftTech Solutions - Websites That Grow Your Business',
  description:
    'We build high-performing websites and web apps that attract more customers, increase conversions, and help your business grow.',
  keywords: [
    'Rapid SoftTech Solutions',
    'software development',
    'web applications',
    'custom software',
    'cloud solutions',
    'RapidLibrary360',
    'library management software',
    'software company',
    'IT solutions',
  ],
  authors: [{ name: 'Rapid SoftTech Solutions' }],
  creator: 'Rapid SoftTech Solutions',
  publisher: 'Rapid SoftTech Solutions',
  metadataBase: new URL('https://www.rapidsofttechsolutions.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.rapidsofttechsolutions.app',
    title: 'Rapid SoftTech Solutions - Professional Software Development',
    description: 'Modern websites and web apps designed to grow your business.',
    siteName: 'Rapid SoftTech Solutions',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Rapid SoftTech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rapid SoftTech Solutions - Websites That Grow Your Business',
    description: 'Modern websites and web apps designed to grow your business.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification-code-here', // You'll get this from Google Search Console
  },
  other: {
    'google-adsense-account': 'ca-pub-1648505168892187',
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable}`}>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PMVGJL7M');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5KQHLGB3ZS"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5KQHLGB3ZS');
            `,
          }}
        />
        {/* End Google Analytics */}

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1648505168892187"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* End Google AdSense */}
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PMVGJL7M"
            height="0"
            width="0"
            className="hidden"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {children}
      </body>
    </html>
  );
}
