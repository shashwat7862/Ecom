const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configHolder.config.emailFrom,
        pass: configHolder.config.emailPassword
    }
});

function sendMail(toEmail, subject, text) {
    const emailOption = {
        from: configHolder.config.emailFrom,
        to: toEmail,
        subject: subject,
        text: text
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(emailOption, (err, success) => {
            if (err) return reject(err);
            resolve(success);
        })
    })
}

module.exports = {
    sendMail
}