import { User } from "@/models/user-model";
import { Expense } from "@/types/expense";
import { connectMongoDB } from "@/utils/database";
import { NextResponse } from "next/server";
import expenses from '../../../../../state/features/expenses/expense-slice';

export async function GET(request: Request, { params }: { params: any }):
    Promise<NextResponse<{ data: Expense[] }> | undefined> {
  try {
    const { id: userId } = params
    if (!userId) {
      throw new Error('id not found')
    }
    await connectMongoDB();
    const user = await User.findById(userId)
    if (!user) {
      throw new Error("user not found")
    }
    const expenses: Expense[] = user.expenses
    return NextResponse.json({ data: expenses }, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    const { id: userId } = params
    const { expenseId } = await request.json()
    if (!userId) {
      throw new Error('id not found')
    }
    await connectMongoDB()
    const find = {
      _id: userId
    }
    const update = {
      $pull: {
        expenses: { _id: expenseId }
      }
    }
    await User.findOneAndUpdate(find, update)
    return NextResponse.json({ message: "expense deleted" }, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}
