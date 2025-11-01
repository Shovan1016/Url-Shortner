import express from "express"
import { loginPostPayloadValidation, signupPostPayloadValidated } from "../validation/user.validation.js"
import { insertUser, userFindByEmail } from "../services/user.services.js"
import { hashedPasswordGenerate } from "../utills/password_utills.js"
import { generateToken } from "../utills/token_utlls.js"


const userRouter = express.Router()

userRouter.post("/sign-up", async (req, res) => {
    const validationResult = await signupPostPayloadValidated.safeParseAsync(req.body);

    if (!validationResult.success) {
        return res.status(400).json(validationResult.error.issues)
    }

    const { email } = validationResult.data;
    const [existingUser] = await userFindByEmail(email)
    if (existingUser) {
        return res.status(400).json(`user with this ${email} already exist`)
    }

    const createdUser = await insertUser(validationResult.data)

    return res.status(201).json(createdUser)
})

userRouter.post("/login", async (req, res) => {
    const validationResult = await loginPostPayloadValidation.safeParseAsync(req.body)

    if (!validationResult.success) {
        return res.status(400).json(validationResult.error.issues)
    }
    const { email, password } = validationResult.data;
    const [existingUser] = await userFindByEmail(email)
    if (!existingUser) {
        return res.status(400).json(`user with this ${email} doesn't exist`)
    }

    const checkPassword = hashedPasswordGenerate(password, existingUser.salt).hashedPassword == existingUser.password

    if (!checkPassword) {
        return res.status(400).json("password or email doesn't match")
    }

    const userToken = generateToken({ id: existingUser.id })

    return res.status(200).json({ token: userToken })
})




export { userRouter };