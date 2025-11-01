import { eq } from "drizzle-orm"
import db from "../db/index.js"
import { usersTable } from "../models/user.model.js"
import { hashedPasswordGenerate } from "../utills/password_utills.js"

export const userFindByEmail = async (email) => {
    return await db.select({
        id: usersTable.id,
        password: usersTable.password,
        salt: usersTable.salt
    }).from(usersTable).where(eq(usersTable.email, email))
}

export const userFindById = async (id) => {
    return await db.select({
        id: usersTable.id,
        email: usersTable.email
    }).from(usersTable).where(eq(usersTable.id, id))
}

export const insertUser = async (payload) => {

    const { salt, hashedPassword } = hashedPasswordGenerate(payload.password)

    const user = await db.insert(usersTable).values({
        firstname: payload.firstName,
        lastname: payload.lastName ?? "",
        email: payload.email,
        salt: salt,
        password: hashedPassword
    }).returning({ id: usersTable.id })

    return user;
}

