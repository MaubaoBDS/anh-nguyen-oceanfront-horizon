import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { sendLeadToTelegram } from "./telegram";
import { insertLead, getAllLeads, updateLeadStatus } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  contact: router({
    submitLead: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(200),
          phone: z.string().min(1).max(30),
          interest: z.string().max(100).optional(),
          budget: z.string().max(100).optional(),
          note: z.string().max(1000).optional(),
          source: z.enum(["form", "popup", "zalo", "call"]).default("form"),
        })
      )
      .mutation(async ({ input }) => {
        // 1. Lưu vào database
        await insertLead({
          name: input.name,
          phone: input.phone,
          interest: input.interest,
          budget: input.budget,
          note: input.note,
          source: input.source,
          status: "new",
        });

        // 2. Gửi Telegram (không throw nếu thất bại)
        const result = await sendLeadToTelegram({
          name: input.name,
          phone: input.phone,
          interest: input.interest,
          budget: input.budget,
          note: input.note,
        });
        if (!result.ok) {
          console.error("[Telegram] Send failed:", result.error);
        }

        return { ok: true } as const;
      }),
  }),

  // CRM admin procedures
  admin: router({
    getLeads: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Chỉ admin mới có quyền xem danh sách lead" });
      }
      return getAllLeads();
    }),

    updateLeadStatus: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["new", "contacted", "interested", "not_interested", "closed"]),
          adminNote: z.string().max(2000).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Chỉ admin mới có quyền cập nhật lead" });
        }
        await updateLeadStatus(input.id, input.status, input.adminNote);
        return { ok: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
