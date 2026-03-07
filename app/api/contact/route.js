import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, company, email, phone, service, budget, message } = await req.json();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, // smtp.gmail.com
            port: process.env.SMTP_PORT, // 465
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Website Inquiry" <${process.env.SMTP_USER}>`,
            replyTo: email,
            to: process.env.SMTP_USER,
            subject: `New Project Inquiry from ${name} - ${service}`,
            html: `
                <h3>New Project Inquiry</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Company:</strong> ${company || "Not provided"}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Service Interest:</strong> ${service || "Not specified"}</p>
                <p><strong>Budget Range:</strong> ${budget || "Not specified"}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
    }
}
