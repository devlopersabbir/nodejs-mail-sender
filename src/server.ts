import express, { Request, Response } from "express";
import dotenv from "dotenv";
import SendMail from "./sendMailer";
import { emailValidator, validateString } from "./utils/validator";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/v1/mail/send", async (req: Request, res: Response) => {
  const { senderName, senderEmail, senderMessage } = req.body;

  // simple server-side validation
  if (!validateString(senderName, 500))
    return res.status(400).json({ message: "Invalid sender name" });
  if (senderName.length < 5)
    return res.status(400).json({ message: "Name length is too low!" });
  if (!emailValidator(senderEmail))
    return res.status(400).json({ message: "Invalid sender email" });
  if (!validateString(senderMessage, 5000))
    return res.status(400).json({ message: "Invalid message" });
  if (senderMessage.length < 5)
    return res.status(400).json({ message: "Message length is too low!" });

  const mailSender = new SendMail(
    senderEmail,
    `${senderName} want to contact from Taboverrider`,
    senderName,
    senderMessage
  );
  try {
    await mailSender.send();
    res.status(200).json({
      message: "Email sent successfully😊",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!😢",
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("server is running!"));
