/**
 * Telegram lead notification module
 * Used by both Vite dev middleware and production Express server.
 */

export interface LeadInput {
  name: string;
  phone: string;
  interest?: string;
  budget?: string;
  note?: string;
}

const INTEREST_LABELS: Record<string, string> = {
  "bang-gia": "Nhận bảng giá",
  "tham-quan": "Đặt lịch tham quan",
  "dau-tu": "Tư vấn đầu tư",
  "uu-dai": "Chính sách ưu đãi",
  "khac": "Nội dung khác",
};

const BUDGET_LABELS: Record<string, string> = {
  "duoi-2-ty": "Dưới 2 tỷ",
  "2-3-ty": "2 - 3 tỷ",
  "3-4-ty": "3 - 4 tỷ",
  "4-5-ty": "4 - 5 tỷ",
  "tren-5-ty": "Trên 5 tỷ",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatLead(lead: LeadInput): string {
  const interestLabel = lead.interest ? INTEREST_LABELS[lead.interest] || lead.interest : "Chưa chọn";
  const budgetLabel = lead.budget ? BUDGET_LABELS[lead.budget] || lead.budget : "Chưa chọn";
  const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

  return [
    "🏢 <b>LEAD MỚI - HÀ SƠN TOWER</b>",
    "",
    `👤 <b>Họ tên:</b> ${escapeHtml(lead.name)}`,
    `📞 <b>SĐT:</b> ${escapeHtml(lead.phone)}`,
    `💼 <b>Quan tâm:</b> ${escapeHtml(interestLabel)}`,
    `💰 <b>Ngân sách:</b> ${escapeHtml(budgetLabel)}`,
    lead.note ? `📝 <b>Ghi chú:</b> ${escapeHtml(lead.note)}` : "",
    "",
    `🕐 <i>${escapeHtml(now)}</i>`,
  ]
    .filter(Boolean)
    .join("\n");
}

export interface TelegramSendResult {
  ok: boolean;
  error?: string;
}

export async function sendLeadToTelegram(lead: LeadInput): Promise<TelegramSendResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN || "8776819461:AAH0Nc1AkPUC_ppg0zg1YpcxgHUdAAwy26I";
  const chatId = process.env.TELEGRAM_CHAT_ID || "5454158215";

  if (!lead.name?.trim() || !lead.phone?.trim()) {
    return { ok: false, error: "Missing required fields" };
  }

  const text = formatLead(lead);
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return { ok: false, error: `Telegram API error: ${response.status} ${errorText}` };
    }

    const data = (await response.json()) as { ok?: boolean; description?: string };
    if (!data.ok) {
      return { ok: false, error: data.description || "Telegram API returned not ok" };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}
