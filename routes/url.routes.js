import express from "express"
import { authIsNeeded } from "../middlewares/auth.middleware.js"
import { shortnerPostPayloadValiadtion } from "../validation/url.validation.js";
import { generateShortCode } from "../utills/url_utills.js";
import { addShortUrl, deleteCode, findUserGivenShortCodeIsExist, getUserUrls, updateHitCount } from "../services/url.services.js"
import { NOT_FOUND_HTML } from "../utills/not_found.js";

const urlRouter = express.Router();


urlRouter.post("/shortner", authIsNeeded, async (req, res) => {
    const validationResult = await shortnerPostPayloadValiadtion.safeParseAsync(req.body)

    if (!validationResult.success) {
        return res.status(400).json(validationResult.error.issues)
    }

    const { targetUrl, shortCode: code } = req.body;

    if (code) {
        const [isShortCodeExist] = await findUserGivenShortCodeIsExist(code)

        if (isShortCodeExist) {
            return res.status(400).json(`${code} this short code is already exist try another${isShortCodeExist}`)
        }
    }

    const shortCode = code ?? generateShortCode()

    const createdUrl = await addShortUrl({ targetUrl, shortCode, userId: req.user?.id })
    return res.json(`https://localhost/${process.env.PORT}/${shortCode}`)
})

urlRouter.get(`/getMyCodes`, authIsNeeded, async (req, res) => {
    const urls = await getUserUrls(req.user.id)
    return res.status(200).json(urls)
})


urlRouter.delete("/deleteCode/:code",authIsNeeded, async (req, res) => {
    const code = req.params.code;

    const [getCodeDetails] = await findUserGivenShortCodeIsExist(code)

    if (getCodeDetails?.userId !== req.user.id) {
        return res.status(400).json("You are not own this code so you can not delete ")
    }

    const deletedCode = deleteCode(code)

   return res.status(200).json(`code is deleted successfully`)
})

urlRouter.get(`/:shortCode`, async (req, res) => {
    const code = req.params.shortCode;

    const [isShortCodeExist] = await findUserGivenShortCodeIsExist(code);
    if (!isShortCodeExist) {
        return res.send(NOT_FOUND_HTML)
    }

    await updateHitCount(code)
    return res.redirect(isShortCodeExist.targetUrl)
})





export { urlRouter }