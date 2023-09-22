import { User } from "@/models/user-model"
import { connectMongoDB } from "@/utils/database"
import { NextResponse } from "next/server"

//todo: find types for second argument
export async function DELETE(request: Request, {params}: {params: any}) {
    try {
        await connectMongoDB()
        await User.findByIdAndDelete(params.id)
        return NextResponse.json({message: "User deleted"})
    } catch (error) {
        console.log("error while deleting user")
    }
}