import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the telegram module
vi.mock("./telegram", () => ({
  sendLeadToTelegram: vi.fn().mockResolvedValue({ ok: true }),
}));

import { sendLeadToTelegram } from "./telegram";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submitLead", () => {
  it("sends lead to Telegram and returns ok", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submitLead({
      name: "Nguyễn Văn A",
      phone: "0933235444",
      interest: "bang-gia",
      budget: "2-3-ty",
      note: "Tôi muốn xem căn 2 phòng ngủ",
    });

    expect(result).toEqual({ ok: true });
    expect(sendLeadToTelegram).toHaveBeenCalledWith({
      name: "Nguyễn Văn A",
      phone: "0933235444",
      interest: "bang-gia",
      budget: "2-3-ty",
      note: "Tôi muốn xem căn 2 phòng ngủ",
    });
  });

  it("sends lead without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submitLead({
      name: "Trần Thị B",
      phone: "0912345678",
    });

    expect(result).toEqual({ ok: true });
    expect(sendLeadToTelegram).toHaveBeenCalledWith({
      name: "Trần Thị B",
      phone: "0912345678",
      interest: undefined,
      budget: undefined,
      note: undefined,
    });
  });

  it("still returns ok when Telegram send fails (graceful degradation)", async () => {
    vi.mocked(sendLeadToTelegram).mockResolvedValueOnce({
      ok: false,
      error: "Telegram API error: 400",
    });

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Lead is saved to DB even if Telegram fails - graceful degradation
    const result = await caller.contact.submitLead({
      name: "Test User",
      phone: "0901234567",
    });
    expect(result).toEqual({ ok: true });
  });

  it("rejects empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submitLead({
        name: "",
        phone: "0901234567",
      })
    ).rejects.toThrow();
  });

  it("rejects empty phone", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submitLead({
        name: "Test User",
        phone: "",
      })
    ).rejects.toThrow();
  });
});
