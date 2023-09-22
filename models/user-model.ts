import mongoose, { Schema } from 'mongoose'

interface User {
    name: string
    password: string
}

const Expense = {
    id: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true }
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    expenses: [ Expense ],
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
