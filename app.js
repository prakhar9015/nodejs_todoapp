import express from "express";

// I can import this 👇 by any name
import userRouter from "./routes/user.js";

import taskRouter from "./routes/task.js";


import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

export const app = express()

config({
    path: "./data/config.env"
})


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // to send cookies as `headers` from server to client, or vice-versa
}))


// by doing this, i just made sure, that all the routes must start with `/users`
app.use("/api/v1/users" ,userRouter)  // here -> `/api/v1` -> means just to tell us that API i used...
// v1 -> version 1

app.use("/api/v1/task" ,taskRouter)


app.get("/", (req, res) => {
    res.send("hey there!")
})

// using error Middleware
app.use(errorMiddleware)





