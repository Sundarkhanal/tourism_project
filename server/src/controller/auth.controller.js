const emailService = require("../services/email.service")
const userService = require("../services/user.service")
class AuthController{

    register = async(req, res, next) => {
        try {
            const data = userService.transformUserData(req)
            const user = await userService.createUser(data)
            await emailService.sendEmail({
                to: user.email,
                subject: "Activate your Account",
                message:`html
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
                                                            Welcome, ${user.name}! 👋
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
                                                                    ${user.otp}
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

            })
            
            res.json({
                data: userService.getPublicUserProfile(user),
                message:"User Registered Successfully!",
                status:"ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }

    login = (req, res, next) => {
        try {
            const {email, password} = req. body
            
            
        } catch (exception) {
            next(exception)
        }
    }
}


module.exports = new AuthController()