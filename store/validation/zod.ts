import z from "zod";

export const expenseNameSchema = z.string().max(20).min(3);

export const memberNameSchema = z.string().max(15).min(3);
