import express from "express"
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.post("/new", isAuthenticated, newTask)

router.get("/my", isAuthenticated, getMyTask)

router.route("/:id")
.put(isAuthenticated, updateTask)
.delete(isAuthenticated, deleteTask)

// router.put("/: id", isAuthenticated, updateTask)




export default router
