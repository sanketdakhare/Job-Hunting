import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()


const sendEmail = async (email, subject, text, url) => {
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
            html:`<h2>${text}</h2> <a>${url}</a>`
        });
        
        
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};

export default sendEmail;