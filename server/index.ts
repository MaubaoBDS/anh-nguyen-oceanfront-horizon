import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { sendLeadToTelegram, type LeadInput } from "./telegram.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "100kb" }));

  // API endpoint for contact form submissions
  app.post("/api/contact", async (req, res) => {
    const body = (req.body || {}) as Partial<LeadInput>;

    if (!body.name?.trim() || !body.phone?.trim()) {
      return res.status(400).json({ ok: false, error: "Thiếu họ tên hoặc số điện thoại" });
    }

    const result = await sendLeadToTelegram({
      name: String(body.name).slice(0, 200),
      phone: String(body.phone).slice(0, 30),
      interest: body.interest ? String(body.interest).slice(0, 50) : undefined,
      budget: body.budget ? String(body.budget).slice(0, 50) : undefined,
      note: body.note ? String(body.note).slice(0, 1000) : undefined,
    });

    if (!result.ok) {
      console.error("[Telegram] Send failed:", result.error);
      return res.status(500).json({ ok: false, error: "Không thể gửi thông tin, vui lòng gọi hotline" });
    }

    return res.json({ ok: true });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
