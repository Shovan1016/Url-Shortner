import { z } from "zod"

export const signupPostPayloadValidated = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
})

export const loginPostPayloadValidation = z.object({
    email: z.string().email(),
    password: z.string()
})