import z from "zod";

export const shortnerPostPayloadValiadtion=z.object({
    shortCode:z.string().optional(),
    targetUrl:z.string()
})

