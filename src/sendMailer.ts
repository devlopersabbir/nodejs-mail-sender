import { createTransport, SendMailOptions } from "nodemailer";

class SendMail {
  constructor(email: string, subject: string, name: string) {
    // const resetUrl: string = process.env.LIVE_SERVER || "http://localhost:3000";

    const tranport = createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER_EMAIL,
        pass: process.env.AUTH_USER_PASSWORD,
      },
    });

    const mailOptions: SendMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      html: `
      <div style="width: 100%; height: auto; padding: 15px 10px; text-align: center;">
      <h1 style="font-size: 25px;">Hi ${name}</h1>
      <div>
        <p>You have requested to reset your password. Please click on the button below to continue.<br>The link will expire within 2 minutes.</p>
        <a href="#" style="background: green; color: white; font-weight: 500; font-size: 17px; padding: 7px 15px; text-decoration: none; border-radius: 6px; margin-top: 7px">Reset Password</a>
      </div>
    <div>
        `,
    };

    tranport.sendMail(mailOptions, (error: any, info) => {
      if (error) return console.log("Fail to send email");
      console.log(`Mail send sussfull! ${info.messageId}`);
    });
  }
}
export default SendMail;
