import { createHmac, randomBytes } from "crypto"

export const hashedPasswordGenerate = (password, userSalt = undefined) => {
    const salt = userSalt ?? generateSalt();

    const hashedPassword = createHmac("sha256", salt).update(password).digest("hex")

    return { salt, hashedPassword }
}

export const generateSalt = () => {
    return randomBytes(26).toString('hex')
}