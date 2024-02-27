import mongoose from "mongoose"


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true  // i know it's required, but declaring here, can create bugs
        // it's better to make the form `input field required` by checking the length of the string 
        // for valid input
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: { // this is for when it is created
        type: Date,
        default: Date.now
    }
})


export const User = mongoose.model("User", schema)

