import { createTransport, SendMailOptions } from "nodemailer";

class SendMail {
  protected tranport: any;
  protected mailOptions: SendMailOptions;
  constructor(
    email: string,
    subject: string,
    name: string,
    senderMessage: string
  ) {
    this.tranport = createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER_EMAIL,
        pass: process.env.AUTH_USER_PASSWORD,
      },
    });

    this.mailOptions = {
      from: email,
      to: process.env.AUTH_USER_EMAIL,
      subject: subject,
      priority: "high",
      html: `
      <div style="width: 100%; height: auto; padding: 15px 30px; text-align: center; maring: auto;">
      <div>
        <h2 style="font-weight: 600; font-size: 20px; width: 60%">You received the following message from the contact form</h2>
        <hr style="width: 60%" />
        <p style="padding: 0px 5px; width: 60%">${senderMessage}</p>
        <hr style="width: 60%" />
        <p style="width: 60%; font-size: 17px; padding: 7px 15px; text-decoration: none; margin-top: 7px">The sender's email is: ${email}</a>
      </div>
    <div>
        `,
    };
  }

  public send = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.tranport.sendMail(this.mailOptions, (error: any) => {
        if (error) return reject(false);
        resolve(true);
      });
    });
  };
}
export default SendMail;
