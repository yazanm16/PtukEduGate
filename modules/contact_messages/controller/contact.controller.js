const {sendContactMessage,listMessage} = require("../service/contact.service");
const {createTransport} = require("nodemailer");


const sendMessageByPost=async (req,res)=>{
    try {
        const {name,email,phone,message}=req.body;
        const result= await sendContactMessage({name, email, phone, message});

        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.APP_KEY,
            }
        });

        await transporter.sendMail({
            from: email,
            to: process.env.SENDER_EMAIL,
            subject: `رسالة جديدة من ${name}`,
            text: `
الاسم: ${name}
البريد الإلكتروني: ${email}
رقم الهاتف: ${phone || 'غير محدد'}
الرسالة:
${message}
    `
        });

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'تم استلام رسالتك',
            text: `Thanks for reaching out. Your request (#${result}) has been received and is being reviewed by our Support Staff.

To add additional comments to this ticket, please reply to this email.

Sincerely,
EduGate Support Team`
        });
        return res.status(200).json({
            success:true,
            message:"Message sent successfully"
        })
    }catch (err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const listMessagesByGet=async (req,res)=>{
    try{
        const messages=await listMessage();
        return res.status(200).json({
            success:true,
            data:messages
        })
    }catch (err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}




module.exports={
    sendMessageByPost,
    listMessagesByGet

}