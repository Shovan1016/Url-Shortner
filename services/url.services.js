import { eq, sql } from "drizzle-orm"
import db from "../db/index.js"
import { urlsTable } from "../models/url.model.js"

export const addShortUrl = async (payload) => {

    return await db.insert(urlsTable).values(payload).returning({
        id: urlsTable.id,
    })
}

export const findUserGivenShortCodeIsExist = async (code) => {
    return await db.select().from(urlsTable).where(eq(code, urlsTable.shortCode))
}

export const getUserUrls = async (userId) => {
    return await db.select().from(urlsTable).where(eq(userId, urlsTable.userId))

}

export const deleteCode = async (code) => {
    return await db.delete(urlsTable).where(eq(code, urlsTable.shortCode))
}

export const updateHitCount = async (code) => {
  return await db
    .update(urlsTable)
    .set({
      hitCount: sql`${urlsTable.hitCount} + 1`
    })
    .where(eq(urlsTable.shortCode, code))
    .returning({ newHitCount: urlsTable.hitCount });
};