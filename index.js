import express from "express"
import "dotenv/config.js"
import { userRouter } from "./routes/user.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js"
import { urlRouter } from "./routes/url.routes.js";

const app = express();

const PORT = process.env.PORT ?? 8000;

app.use(express.json())

// app.use("/",(req,res)=>{
//     return res.status(200).json("server is running good ")
// })

app.use(authMiddleware)

app.use("/user", userRouter)
app.use(urlRouter)


app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})

