import { connectMongoDB } from "@/utils/database";
import { User } from "@/models/user-model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const {name, password} = await request.json()
        await connectMongoDB()
        await User.create({name, password})
        return NextResponse.json({ message: "User created" })
    } catch (error) {
        return NextResponse.json({error: 'something went wrong'})
    }
}

