const nodemailer = require("nodemailer");

const sendResetEmail = async (email, token) => {
    const resetLink = `http://localhost:5173/reset-password/?token=${token}`;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.APP_KEY
        }
    });

    const mailOption = {
        from:`Vision 360 <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: 'طلب إعادة تعيين كلمة المرور',
        html: `<div style="font-size: 16px;" dir="rtl">
                  <span style="color: black !important;">
                    لقد طلبت إعادة تعيين كلمة المرور. انقر على الرابط لإعادة تعيين كلمة المرور الخاصة بك:
                  </span>
                  <a href="${resetLink}">إعادة تعيين كلمة المرور</a>
               </div>`
    };
    await transporter.sendMail(mailOption);
};

module.exports = {
    sendResetEmail
};