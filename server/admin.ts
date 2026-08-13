import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

// Simple admin password (in production, use proper hashing with bcrypt)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Store session tokens in memory (in production, use Redis or database)
const adminSessions = new Set<string>();

export const adminRouter = router({
  // Admin login with password
  login: publicProcedure
    .input(z.object({ password: z.string() }))
    .mutation(({ input }) => {
      if (input.password !== ADMIN_PASSWORD) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }

      // Generate a simple token (in production, use JWT)
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      adminSessions.add(token);

      return { token, success: true };
    }),

  // Verify admin session
  verify: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(({ input }) => {
      return { isValid: adminSessions.has(input.token) };
    }),

  // Admin logout
  logout: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(({ input }) => {
      adminSessions.delete(input.token);
      return { success: true };
    }),
});
