import jwt from "jsonwebtoken"

// learn about cookies from MDN

export const sendCookie = (user, res, message, statusCode = 200)=> {  // here, statusCode is default 200

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET) // sending data via payload

    res.status(statusCode).
        cookie("token", token, {
        httpOnly: true,
        maxAge: 15*60*1000, // for 15 minutes (1000 -> 1 second)
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message
        })
}
