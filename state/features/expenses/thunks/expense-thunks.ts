import { Expense } from "@/types/expense";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addExpense } from "../expense-slice";

export const addExpenseThunk = createAsyncThunk<string, { userId: string | undefined, formData: Expense }, { rejectValue: Error }>(
    'expenses/addExpense', async ({ userId, formData }, thunkAPI) => {
        try {
            if (!userId) {
                throw new Error('You are not authorized')
            }
            const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'POST',
                cache: "no-cache",
                body: JSON.stringify(formData)
            })
            if (!res.ok) {
                throw new Error('Something went wrong, try again later')
            }
            thunkAPI.dispatch(addExpense(formData))
            return await res.json()
        } catch (error) {
            return thunkAPI.rejectWithValue(error as Error)
        }

    }
)


export const fetchExpensesThank = createAsyncThunk<Expense[], string>(
    'expenses/fetchExpenses',
    async (id, thunkAPI) => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}/expenses`, { cache: 'no-store' })
            if (!res.ok) {
                return {
                    error: res.statusText
                }
            }
            const expenses = await res.json()
            return expenses.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error as Error)
        }

    }
)

