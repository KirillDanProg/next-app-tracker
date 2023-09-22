import mongoose from 'mongoose'

let isConnected = false

export const connectMongoDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI
        if (isConnected) {
            console.log("MongoDB is already connected")
            return
        }
        if (!MONGODB_URI) {
            throw new Error('No mongodb uri')
        }

        await mongoose.connect(MONGODB_URI)
        isConnected = true
        console.log('Connected to MongoDB')
    } catch (e) {
        console.log(e)
    }
}

