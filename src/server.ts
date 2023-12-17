import express, { Request, Response } from "express";
import dotenv from "dotenv";
import SendMail from "./sendMailer";
dotenv.config();

const app = express();
app.post("/api/v1/mail/send", (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  new SendMail("mdsadikulislamsabbir@gmail.com", "Hello Sabbir", "Sabbir");
  res.status(200).json({
    hello: "world",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("server is running!"));
