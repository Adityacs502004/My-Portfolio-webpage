import  express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import 'dotenv/config';

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

const GOOGLE_USER = process.env.EMAIL_USER?.trim();
const GOOGLE_PASSWORD = process.env.EMAIL_PASS?.replace(/\s/g, '');

if (!GOOGLE_USER || !GOOGLE_PASSWORD) {
    throw new Error('Missing EMAIL_USER or EMAIL_PASS in backend/.env');
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: GOOGLE_USER,
        pass: GOOGLE_PASSWORD,
    },
});


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/send_detail' , async (req , res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const detail = req.body.details;

    const mailoptions = {
    
    from: GOOGLE_USER,
      
    to: GOOGLE_USER,
    
    replyTo: email, 
    
    
    subject: `[Website Contact Form] Message from ${username}`,
    
    text: `You have received a new message from your website contact form.

    User Details:
    ---------------------------------------------
    Name:  ${username}
    Email: ${email}

    Message / Information Shared:
    ---------------------------------------------
    ${detail}`
    };

    if (username && email && detail){
        try {
            await transporter.sendMail(mailoptions)

            res.status(200).json({
                success : true,
                message : "Sent email successfully"
            })
        } catch (error) {
            console.error('Failed to send contact email:', error);
            res.status(500).json({
                success : false,
                message : "Failed to send email (contact the owner)"
            })
        }
        
    }
    else{
        res.status(400).json({
            message : "Incomplete user data",
            success : false
        })
    }
})
app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
})