
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: [
        'https://my-portfolio-sigma-taupe-15.vercel.app',
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Initialize Resend
if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL;

if (!CONTACT_RECEIVER_EMAIL) {
    throw new Error('Missing CONTACT_RECEIVER_EMAIL environment variable');
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/send_detail', async (req, res) => {
    const { username, email, details } = req.body;

    if (
        typeof username !== 'string' || !username.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof details !== 'string' || !details.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: 'Incomplete or invalid user data'
        });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [CONTACT_RECEIVER_EMAIL],
            replyTo: email.trim(),
            subject: `[Website Contact Form] Message from ${username.trim()}`,
            text: `You have received a new message from your website contact form.

Name: ${username.trim()}
Email: ${email.trim()}

Message:
${details.trim()}`
        });

        if (error) {
            console.error('Resend email error:', error);

            return res.status(500).json({
                success: false,
                message: 'Failed to send email'
            });
        }

        console.log('Email accepted by Resend:', data.id);

        return res.status(200).json({
            success: true,
            message: 'Sent email successfully'
        });

    } catch (error) {
        console.error('Failed to send contact email:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to send email'
        });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is live on port ${port}`);
});
