import { z } from "zod";

export const bookingValidationSchema = z.object({
  date: z.date(),
  user: z.string(),
  car: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  totalCost: z.number().default(0),
});
