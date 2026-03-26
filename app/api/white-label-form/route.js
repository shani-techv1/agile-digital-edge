import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, email, company, country, teamSize, services, message } = await req.json();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Partnership Application" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `New White Label Partnership Inquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #007bff;">New White Label Partnership Application</h2>
                    <p><strong>Full Name:</strong> ${name}</p>
                    <p><strong>Work Email:</strong> ${email}</p>
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Country:</strong> ${country || "Not specified"}</p>
                    <p><strong>Team Size:</strong> ${teamSize || "Not specified"}</p>
                    <p><strong>Services Interested In:</strong> ${services || "None selected"}</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
                    <p><strong>Message / Project Details:</strong></p>
                    <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Enquiry sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending white-label enquiry:', error);
        return NextResponse.json({ message: 'Error sending enquiry' }, { status: 500 });
    }
}
