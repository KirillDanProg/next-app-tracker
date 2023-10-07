import { User } from "@/models/user-model";
import { Expense } from "@/types/expense";
import { connectMongoDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: any }):
    Promise<NextResponse<{ data: Expense[] }> | undefined> {
  try {
    const { id } = params
    if (!id) {
      throw new Error('id not found')
    }
    await connectMongoDB();
    const user = await User.findById(id)
    if (!user) {
      throw new Error("user not found")
    }
    const expenses: Expense[] = user.expenses
    return NextResponse.json({ data: expenses }, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}
