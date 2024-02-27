import mongoose, { Mongoose } from "mongoose"


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    user : {
        type: mongoose.Schema.Types.ObjectId, // same as ID in mongodb compass for each data
        ref: "User", // ref -> reference, name of collection (User)
        required: true
    },
    createdAt: { // this is for when it is created
        type: Date,
        default: Date.now
    }
})


export const Task = mongoose.model("Task", schema)

