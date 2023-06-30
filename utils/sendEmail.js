const nodemailer = require('nodemailer')

const sendEmail = async(options)=>{
    const transporter= await nodemailer.createTransport({
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    })

    const mailOptions = {
        from:'',
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    transporter.sendMail(mailOptions)
        
}
   
