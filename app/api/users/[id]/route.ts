import { User } from "@/models/user-model";
import { connectMongoDB } from "@/utils/database";
import { NextResponse } from "next/server";

//todo: find types for second argument
export async function DELETE(request: Request, { params }: { params: any }) {
  try {
    await connectMongoDB();
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.log("error while deleting user");
  }
}

export async function POST(request: Request, { params }: { params: any }) {
  try {
    const { id } = params
    const newExpense = await request.json()
    await connectMongoDB();
    const user = await User.findById(id)
    if (!user) {
      throw new Error("user not found")
    }
    const find = {
      _id: id
    }
    const update = { $push: { expenses: newExpense } }
    await User.findOneAndUpdate(find, update)
    return NextResponse.json({ message: "expenses added" });
  } catch (error) {
    console.log("error while adding expense");
  }
}