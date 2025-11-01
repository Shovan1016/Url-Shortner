import { userFindById } from "../services/user.services.js"
import { verifyToken } from "../utills/token_utlls.js"

export const authMiddleware = async (req, res, next) => {
    const reqToken = req.headers['authorization']
    if (reqToken) {
        const [_, token] = reqToken.split(" ")
        if (token) {
            const result = verifyToken(token)
            if (result.id) {
                const [user] = await userFindById(result.id)

                if (user) {
                    req.user = user
                }
            }
        }
    }
    next()
}

export const authIsNeeded = async (req, res, next) => {
    if (!req?.user?.id) {
        return res.status(400).json("You must need authentication for access this resourse")
    }
    next();
}