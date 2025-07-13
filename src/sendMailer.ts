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
      to: process.env
        .RECEIVER_EMAIL_ADDRESS /** user can be change the sender email from the .env */,
      // from: email,
      // to: process.env.AUTH_USER_EMAIL, /** this line depricated */
      subject: subject,
      priority: "high",
      html: `
      <div class="container" style="text-align: center">
   <div class="main">
      <h2 style="font-weight: 600; font-size: 20px">
         You received the following message from the contact form
      </h2>
      <hr style="width: 50%; background-color: gray" />
      <p>${senderMessage}</p>
      <hr style="width: 30%; background-color: gray" />
      <span><b>Sender Information</b></span>
      <div style="display: flex; flex-direction: column; justify-content: start; align-items: start">
         <p style="margin: 0px;">Name: <b>${name}</b></p><br />
         <p style="margin: 0px;">Email: <b>${email}</b></p>
      </div>
   </div>
</div>
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
