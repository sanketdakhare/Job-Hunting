import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()


const sendEmail = async (email, subject, url) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html :`<h4>Thank you for registering with us!</h4>
                 <p><span><a href="${url}">Click here </a></span>to verify your email address</p>
                 <p>If you did not request this verification, please ignore this email.</p> ` 
        });
        
        
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};

export default sendEmail;