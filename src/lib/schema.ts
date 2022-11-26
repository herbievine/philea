import * as z from "zod";

const emissionsApiSchema = z.record(
  z.enum(["powData", "posData"]),
  z.object({
    impact: z.number(),
    gas: z.number(),
    tx: z.number(),
  })
);

export { emissionsApiSchema };
