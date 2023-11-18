import z from "zod"

const REQUIRED_FIELD = "This field is required"

export const loginFormSchema = z.object({
    email: z.string({
        invalid_type_error: "Email must be a string",
        required_error: REQUIRED_FIELD
    }).email(),
    password: z.string({
        invalid_type_error: "Password must be a string",
        required_error: REQUIRED_FIELD
    }).min(3, "Minimum 3 characters")
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>