import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAttachments() {
  const dir = path.join(__dirname, "email-assets");
  const files = ["photo1.jpg"];

  // Ensure files exist (nice error message)
  for (const f of files) {
    const p = path.join(dir, f);
    if (!fs.existsSync(p)) {
      throw new Error(`Missing email attachment: server/email-assets/${f}`);
    }
  }

  return files.map((f) => ({
    filename: f,
    path: path.join(dir, f),
  }));
}

app.post("/send-email", async (req, res) => {
  try {
    const text =
`My Nikol,

I sent this from the little page I made for you — because I want you to know I’m serious.

I’m sorry for what I did wrong — today and before. I’m not asking you to ignore the pain. I’m asking you to let me prove that I can be better.
I want to protect what we have, speak with kindness, listen with patience, and choose you with actions, not just words.

If you give me a chance, I’ll earn your trust again, step by step.

I love you.
Vasil ❤️
`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "For you, my Nikol ❤️",
      text,
      attachments: getAttachments(),
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: String(err.message || err) });
  }
});

// Health check
app.get("/", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
