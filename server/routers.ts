import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { sendLeadToTelegram } from "./telegram";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submitLead: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(200),
          phone: z.string().min(1).max(30),
          interest: z.string().max(50).optional(),
          budget: z.string().max(50).optional(),
          note: z.string().max(1000).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await sendLeadToTelegram({
          name: input.name,
          phone: input.phone,
          interest: input.interest,
          budget: input.budget,
          note: input.note,
        });

        if (!result.ok) {
          console.error("[Telegram] Send failed:", result.error);
          throw new Error("Không thể gửi thông tin. Vui lòng thử lại sau.");
        }

        return { ok: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
