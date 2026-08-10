import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import SendMail from "./sendMailer";
import { emailValidator, validateString } from "./utils/validator";
import { formSchema } from "./lib/form-validation";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// health checker
app.get("/", (req, res) => {
  res.status(200).json({
    version: "0.0.3",
    name: "Mail sender API",
    message: "API works perfectly",
    creator: "Sabbir Hossain Shuvo",
    github: "https://github.com/devlopersabbir",
  });
});
app.post("/api/v1/mail/send", async (req: Request, res: Response) => {
  const { success, data, error } = formSchema.safeParse(req.body);
  if (!success) return res.status(400).json(error);

  const subject = data.subject || `New Form Message by ${data.name}`;

  const mailSender = new SendMail(
    data.email,
    subject,
    data.name,
    data.message,
    data.html
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

export default app;
