import express from "express";

// import { User } from "../models/user.js"; // now no needed! all in controllers
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()


// router.get("/all", getAllUsers)

router.post("/new", register)

router.post("/login", login)

router.get("/logout", logout)


router.get("/me", isAuthenticated, getMyProfile)







// chaining routers
// router
//     .route("/userid/:id")
//     .get(getMyProfile)
    // .put(updateUser)
    // .delete(deleteUser)


// router.get("/userid/:id", findUser)
// router.put("/userid/:id", updateUser)
// router.delete("/userid/:id", deleteUser)


export default router
















// router.get("/userid/special", (req, res)=> {
//     res.json({
//         success: true,
//         message: "Just joking"
//     })
// })

// users[1].email












