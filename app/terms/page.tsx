import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Rapid SoftTech Solutions',
  description: 'Terms and Conditions for using Rapid SoftTech Solutions library management services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-xl text-blue-100">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions ("Terms") constitute a legally binding agreement between you and Rapid SoftTech Solutions ("Company," "we," "us," or "our") regarding your access to and use of the <Link href="/" className="text-blue-600 hover:underline">www.rapidsofttechsolutions.app</Link> website and our library management services.
            </p>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services.
            </p>

            <h2>2. Services</h2>
            <p>
              Rapid SoftTech Solutions provides library membership management software and related services, including:
            </p>
            <ul>
              <li>Member registration and management</li>
              <li>Membership renewal tracking</li>
              <li>Payment processing</li>
              <li>Automated notifications (email/SMS)</li>
              <li>Library website creation</li>
              <li>Reporting and analytics</li>
            </ul>

            <h2>3. User Accounts</h2>
            
            <h3>3.1 Account Registration</h3>
            <p>
              To access certain features of our services, you must register for an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>

            <h3>3.2 Account Eligibility</h3>
            <p>
              You must be at least 18 years old and have the legal capacity to enter into contracts to use our services.
            </p>

            <h2>4. Subscription and Payment</h2>
            
            <h3>4.1 Pricing</h3>
            <p>
              Subscription fees are clearly stated on our pricing page. Prices are subject to change with 30 days' notice.
            </p>

            <h3>4.2 Payment Terms</h3>
            <ul>
              <li>Subscriptions are billed in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>You authorize us to charge your payment method for all fees</li>
              <li>Failed payments may result in service suspension</li>
            </ul>

            <h3>4.3 Free Trial</h3>
            <p>
              We may offer a free trial period. After the trial, your subscription will automatically convert to a paid subscription unless you cancel before the trial ends.
            </p>

            <h2>5. Acceptable Use Policy</h2>
            
            <h3>5.1 Permitted Use</h3>
            <p>You may use our services only for lawful purposes and in accordance with these Terms.</p>

            <h3>5.2 Prohibited Activities</h3>
            <p>You agree NOT to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Use our services for spam or unsolicited communications</li>
              <li>Scrape or harvest data from our website</li>
              <li>Resell or redistribute our services without permission</li>
              <li>Impersonate any person or entity</li>
            </ul>

            <h2>6. Intellectual Property Rights</h2>
            
            <h3>6.1 Our Property</h3>
            <p>
              All content, features, and functionality of our services, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, and software, are the exclusive property of Rapid SoftTech Solutions and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3>6.2 Your Content</h3>
            <p>
              You retain ownership of any content you upload to our services. By uploading content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content solely for the purpose of providing our services.
            </p>

            <h2>7. Third-Party Services</h2>
            <p>
              Our services may integrate with third-party services (e.g., payment processors, SMS providers). Your use of such services is governed by their respective terms and conditions.
            </p>

            <h2>8. Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. By using our website, you acknowledge and agree that:
            </p>
            <ul>
              <li>Advertisements may appear on various pages</li>
              <li>We have no control over the content of third-party ads</li>
              <li>Clicking on ads is at your own risk</li>
              <li>You will not click on ads for fraudulent purposes</li>
              <li>You will not encourage others to click on ads</li>
            </ul>

            <h2>9. Data and Privacy</h2>
            <p>
              Our collection and use of personal information is governed by our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. By using our services, you consent to such collection and use.
            </p>

            <h2>10. Service Modifications and Availability</h2>
            <p>
              We reserve the right to:
            </p>
            <ul>
              <li>Modify or discontinue any part of our services</li>
              <li>Suspend services for maintenance</li>
              <li>Change features, pricing, or terms</li>
            </ul>
            <p>
              We will make reasonable efforts to notify you of significant changes.
            </p>

            <h2>11. Termination</h2>
            
            <h3>11.1 By You</h3>
            <p>You may cancel your subscription at any time through your account settings.</p>

            <h3>11.2 By Us</h3>
            <p>
              We may suspend or terminate your account if you violate these Terms or engage in fraudulent, abusive, or illegal activities.
            </p>

            <h3>11.3 Effect of Termination</h3>
            <p>
              Upon termination, your right to use our services will cease immediately. We may delete your data as per our retention policy.
            </p>

            <h2>12. Disclaimers and Limitation of Liability</h2>
            
            <h3>12.1 Disclaimer of Warranties</h3>
            <p>
              Our services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.
            </p>

            <h3>12.2 Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, Rapid SoftTech Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>

            <h2>13. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Rapid SoftTech Solutions from any claims, damages, liabilities, and expenses arising from your use of our services or violation of these Terms.
            </p>

            <h2>14. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra.
            </p>

            <h2>15. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website. Continued use of our services after changes constitutes acceptance of the new Terms.
            </p>

            <h2>16. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:rapidsofttechsolutions@gmail.com" className="text-blue-600 hover:underline">rapidsofttechsolutions@gmail.com</a></li>
              <li><strong>Website:</strong> <Link href="/" className="text-blue-600 hover:underline">www.rapidsofttechsolutions.app</Link></li>
              <li><strong>Location:</strong> Pune, Maharashtra, India</li>
            </ul>

            <h2>17. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
            </p>

            <h2>18. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Rapid SoftTech Solutions regarding the use of our services.
            </p>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Acknowledgment</h3>
              <p className="text-blue-800">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/privacy"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            ← Privacy Policy
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Back to Home →
          </Link>
        </div>
      </div>
    </div>
  );
}
