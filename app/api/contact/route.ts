import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, businessType, message } = await req.json();

    if (!name || !phone || !businessType || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || process.env.MAIL_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || process.env.MAIL_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER || process.env.MAIL_USER;
    const smtpPassRaw = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.MAIL_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM || process.env.MAIL_FROM || smtpUser;
    const contactEmail = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || smtpUser;
    const smtpPass = smtpPassRaw ? smtpPassRaw.replace(/\s+/g, '') : '';
    const looksLikePlaceholder =
      smtpUser === 'your-email@gmail.com' || smtpPassRaw === 'your-app-password';

    if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom || !contactEmail || looksLikePlaceholder) {
      return NextResponse.json(
        {
          error:
            'Contact form is not configured yet. Set SMTP_HOST, SMTP_USER, SMTP_PASS (or SMTP_PASSWORD), SMTP_FROM and CONTACT_EMAIL in deployment environment variables (Vercel Project Settings).',
        },
        { status: 500 }
      );
    }

    const secure =
      process.env.SMTP_SECURE === 'true' || (Number.isFinite(smtpPort) && smtpPort === 465);

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: smtpFrom,
      to: contactEmail,
      subject: 'New Free Consultation Request',
      text: `
        New Free Consultation Request:

        Name: ${name}
        Phone: ${phone}
        Business Type: ${businessType}
        Message: ${message}
      `,
      html: `
        <h2>New Free Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error sending email:', error);

    if (error instanceof Error && 'code' in error && (error as { code?: string }).code === 'EAUTH') {
      return NextResponse.json(
        {
          error:
            'SMTP authentication failed. For Gmail, use your full Gmail address as SMTP_USER and a valid App Password (not your normal Gmail password).',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          'Unable to send email right now. Please verify your SMTP settings or use WhatsApp temporarily.',
      },
      { status: 500 }
    );
  }
}