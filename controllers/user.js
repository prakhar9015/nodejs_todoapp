import { User } from "../models/user.js"
import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

import {sendCookie} from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js"

// export const getAllUsers =  async (req, res)=> {}


export const login = async(req, res, next)=> {

    try {
        const {email, password} = req.body

        // using `.select("+password")` means that in userSchema, i've set `select: false` means, anytime, i will do
        // a `User.findOne({email}), it won;t give me `password`, but to fetch it, use `+password` like so...

        const user = await User.findOne({email}).select("+password")
        if (!user) return next(new ErrorHandler("Invalid email or password ❌", 400)) // 400 -> bad request

        // if (!user) // if user is not found and tries to login
        //     return res.status(404).json({
        //         success: false,
        //         message: "Invalid email or password ❌ "
        // })

        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!user) return next(new ErrorHandler("Invalid email or password ❌", 404))

        // if (!isMatch) // if user is not found and tries to login
        // return res.status(404).json({
        //     success: false,
        //     message: "Invalid email or password ❌ "
        // })

        sendCookie(user, res, `Welcome back ${user.name} 🙏`, 200)
    } catch (error) {
        next(error)
    }
}


export const register = async (req, res)=> {

    try {
        const {name, email, password} = req.body
        let user = await User.findOne({email})

        if (!user) return next(new ErrorHandler("⚠️ user already exist! ✅", 404))

        // if (user) // if user already exists and still tries to register
        //     return res.status(404).json({
        //         success: false,
        //         message: " ⚠️ user already exist! ✅"
        // })

        const hashedPassword = await bcrypt.hash(password, 10) // here 10 is saltRounds
        user = await User.create({name, email, password: hashedPassword})
        sendCookie(user, res, "registered successfully 🎉", 201)
    } catch (error) {
        next(error)
    }
}


// this is mostly like, how user get to see their profile once logged into insta
export const getMyProfile = (req, res)=> {

    res.status(200).json({
        success: true,
        user: req.user
    })
}


export const logout = (req, res)=> {

    res.status(200)
    .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
        success: true,
        user: req.user
    })

}
