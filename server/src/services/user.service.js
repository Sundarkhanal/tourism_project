const UserModel = require("../models/user.model")
const randomStringGenerator = require("../utilities/hepler")
const bcrypt = require("bcryptjs")
class UserService{
    transformUserData(req, next){
        const data = req.body
        // console.log(data);
        
        data.password = bcrypt.hashSync(data.password)
        data.emailVerified = false
        data.otp = randomStringGenerator(6).toUpperCase()
        data.expiryTime = new Date(Date.now() + 600000)   //converting 10 mins into ms, 1 min = 60sec *1000*10
        return data
    }


    createUser = async(data) => {
        try {
            const userObj = new UserModel(data)
            return await userObj.save()
            
        } catch (exception) {
            console.log(exception);
            throw{code:422, message:"User cannot be Registered at this moment"}
        }
    }

    getPublicUserProfile(userObj){
        const {_id, name, email, phone, address, gender, createdAt, updatedAt} = userObj
        return{
            _id, name, email, phone, address, gender, createdAt, updatedAt
        } 
    }

    getActivateYourAccountMessage({name, otp}){
        return(
`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Verify Your Account - BatoSanjaal</title>
                            </head>
                            <body style="margin:0;padding:0;background-color:#f0fdfa;font-family:Arial,Helvetica,sans-serif;">

                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0fdfa;padding:30px 15px;">
                                    <tr>
                                        <td align="center">

                                            <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08);">

                                                <!-- Header -->
                                                <tr>
                                                    <td align="center" style="background:linear-gradient(135deg,#0f766e,#14b8a6);padding:40px 30px;">
                                                        <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;">
                                                            BatoSanjaal
                                                        </h1>
                                                        <p style="margin:10px 0 0;color:#d1fae5;font-size:16px;line-height:1.5;">
                                                            Your Journey Starts Here
                                                        </p>
                                                    </td>
                                                </tr>

                                                <!-- Content -->
                                                <tr>
                                                    <td style="padding:40px 35px;color:#374151;">

                                                        <h2 style="margin-top:0;color:#0f766e;font-size:26px;">
                                                            Welcome, ${name}! 👋
                                                        </h2>

                                                        <p style="font-size:16px;line-height:1.8;margin-bottom:20px;">
                                                            Thank you for joining <strong>BatoSanjaal</strong>. We're excited to have you as part of our growing community.
                                                        </p>

                                                        <p style="font-size:16px;line-height:1.8;margin-bottom:25px;">
                                                            BatoSanjaal is designed to help people connect, travel smarter, and discover opportunities along the way. Whether you're looking to explore new destinations, connect with fellow travelers, or make your journey more efficient, you're in the right place.
                                                        </p>

                                                        <!-- OTP Box -->
                                                        <div style="text-align:center;margin:35px 0;">
                                                            <p style="margin-bottom:12px;color:#6b7280;font-size:14px;">
                                                                Your Verification Code
                                                            </p>

                                                            <div style="display:inline-block;background:#ecfeff;border:2px solid #14b8a6;border-radius:12px;padding:18px 40px;">
                                                                <span style="font-size:34px;font-weight:bold;letter-spacing:8px;color:#0f766e;">
                                                                    ${otp}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <p style="font-size:15px;line-height:1.8;">
                                                            Enter this OTP to verify your account and complete your registration.
                                                            This code will remain valid for <strong>10 minutes</strong>.
                                                        </p>

                                                        <!-- Motivation Section -->
                                                        <div style="background:#f0fdfa;border-left:4px solid #14b8a6;padding:20px;margin:30px 0;border-radius:8px;">
                                                            <h3 style="margin-top:0;color:#0f766e;">
                                                                Why Complete Your Registration?
                                                            </h3>

                                                            <p style="margin-bottom:0;font-size:15px;line-height:1.8;color:#4b5563;">
                                                                Every great journey begins with a single step. By verifying your account today,
                                                                you'll unlock access to features designed to make traveling and connecting easier,
                                                                faster, and more meaningful. We can't wait to see where your journey with
                                                                BatoSanjaal takes you.
                                                            </p>
                                                        </div>

                                                        <p style="font-size:15px;line-height:1.8;color:#4b5563;">
                                                            If you did not request this code, you can safely ignore this email.
                                                        </p>

                                                    </td>
                                                </tr>

                                                <!-- Footer -->
                                                <tr>
                                                    <td align="center" style="background:#f8fafc;padding:25px;border-top:1px solid #e5e7eb;">

                                                        <p style="margin:0;color:#0f766e;font-weight:600;font-size:16px;">
                                                            Thank you for choosing BatoSanjaal
                                                        </p>

                                                        <p style="margin:10px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
                                                            This is an automated message. Please do not reply to this email.
                                                        </p>

                                                        <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">
                                                            © 2026 BatoSanjaal. All Rights Reserved.
                                                        </p>

                                                    </td>
                                                </tr>

                                            </table>

                                        </td>
                                    </tr>
                                </table>

                            </body>
                            </html>
                            `
        )
    }

    getResentActivationOTPCode({name, otp}){
        return(
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Resend - BatoSanjaal</title>
            </head>
            <body style="margin:0;padding:0;background-color:#f0fdfa;font-family:Arial,Helvetica,sans-serif;">

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0fdfa;padding:30px 15px;">
                    <tr>
                        <td align="center">

                            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08);">

                                <!-- Header -->
                                <tr>
                                    <td align="center" style="background-color:#0f766e;padding:40px 30px;">
                                        <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;">
                                            BatoSanjaal
                                        </h1>
                                        <p style="margin:10px 0 0;color:#d1fae5;font-size:16px;">
                                            Your Journey Starts Here
                                        </p>
                                    </td>
                                </tr>

                                <!-- Content -->
                                <tr>
                                    <td style="padding:40px 35px;color:#374151;">

                                        <h2 style="margin-top:0;color:#0f766e;font-size:26px;">
                                            Hello ${name},
                                        </h2>

                                        <p style="font-size:16px;line-height:1.8;">
                                            We received a request to resend your One-Time Password (OTP). Please use the verification code below to continue with your account verification.
                                        </p>

                                        <!-- OTP Box -->
                                        <div style="text-align:center;margin:35px 0;">
                                            <p style="margin-bottom:12px;color:#6b7280;font-size:14px;">
                                                Your New Verification Code
                                            </p>

                                            <div style="display:inline-block;background:#ecfeff;border:2px solid #14b8a6;border-radius:12px;padding:18px 40px;">
                                                <span style="font-size:34px;font-weight:bold;letter-spacing:8px;color:#0f766e;">
                                                    ${otp}
                                                </span>
                                            </div>
                                        </div>

                                        <p style="font-size:15px;line-height:1.8;">
                                            This OTP is valid for <strong>10 minutes</strong>. Enter this code to complete your verification process.
                                        </p>

                                        <div style="background:#f0fdfa;border-left:4px solid #14b8a6;padding:20px;margin:30px 0;border-radius:8px;">
                                            <h3 style="margin-top:0;color:#0f766e;">
                                                Security Notice
                                            </h3>

                                            <p style="margin-bottom:0;font-size:15px;line-height:1.8;color:#4b5563;">
                                                If you did not request a new OTP, please ignore this email. No changes will be made to your account unless this verification code is used.
                                            </p>
                                        </div>

                                        <p style="font-size:15px;line-height:1.8;color:#4b5563;">
                                            For your security, never share this OTP with anyone. BatoSanjaal will never ask for your verification code through email, phone call, or message.
                                        </p>

                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td align="center" style="background:#f8fafc;padding:25px;border-top:1px solid #e5e7eb;">

                                        <p style="margin:0;color:#0f766e;font-weight:600;font-size:16px;">
                                            Thank you for using BatoSanjaal
                                        </p>

                                        <p style="margin:10px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
                                            This is an automated message. Please do not reply to this email.
                                        </p>

                                        <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">
                                            © 2026 BatoSanjaal. All Rights Reserved.
                                        </p>

                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>
                </table>

            </body>
            </html>
            `
        )
    }

    getSingleUserProfile = async(filter) => {
        try {
            const userDetail = await UserModel.findOne(filter)
            return userDetail
        } catch (exception) {
            throw{
                code: 500,
                message: exception.message ?? "Error While fetching User Profile", status:"ERR_FETCHING_USER_PROFILE"
            }
        }
    }
    updateSingleUserProfile = async(filter, data) => {
        try {
            const update = await UserModel.findOneAndUpdate(filter, {$set: data}, {new:true})  //{new:true} => provides us updated data
            return update
        } catch (exception) {
            throw{
                code:500,
                message:exception.message ?? "Error Updating User Profile",
                status:"ERR_UPDATING_USER_PROFILE"
            }
        }
    }



}

module.exports =  new UserService()