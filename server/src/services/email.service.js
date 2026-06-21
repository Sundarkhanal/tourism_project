const nodemailer = require("nodemailer")
const { smtpConfig } = require("../config/config")
class EmailService{

    #transport
    constructor(){
        try {
            this.#transport = nodemailer.createTransport({
                host:smtpConfig.host,
                port:smtpConfig.port,
                //if using gmail as SMTP
                service:smtpConfig.provider,
                auth:{
                    user:smtpConfig.user,
                    pass:smtpConfig.password
                }
            })
            console.log("***SMTP Server Connected Successfully!***");
            
            
        } catch (exception) {
            console.error("****SMTP Server Not Connected****")
            throw{code: 500, message: exception.message ?? "SMTP Server connection Error", status:"SMTP_SERVER_CONNECTION_ERR"}
        }
    }

    async sendEmail({to, subject, message}){
        try {
            return await this.#transport.sendMail({
                to: to,
                from: smtpConfig.from,
                subject: subject,
                html: message
            })
            
        } catch (exception) {
            throw{
                code: 500,
                message: exception.message ?? "Email Sending Failed",
                status:"SMTP_MAIL_SENDING_ERR"
            }
        }
    }
}

module.exports = new EmailService()