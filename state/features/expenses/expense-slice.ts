import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/state/store";
import { Expense } from "@/types/expense";
import { createAsyncThunk } from "@reduxjs/toolkit";

type Status = "idle" | "loading" | "success" | "failed";

type InitialState = {
    data: Expense[];
    status: Status;
    error: string | string[];
};
const initialState = {
    data: [],
    status: "idle",
    error: "",
} as InitialState;

const expenses = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        addExpense: (state, { payload }: PayloadAction<Expense>) => {
            state.data.push(payload)
        },
        deleteExpense: (state, { payload }: PayloadAction<string>) => {
            state.data = state.data.filter(el => el._id !== payload)
        },
        editExpense: () => {
        },
        setStatus: (state, { payload }: PayloadAction<Status>) => {
            state.status = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addExpenseThunk.fulfilled, (state, action) => {
                state.status = 'success'
            })
            .addCase(addExpenseThunk.rejected, (state, { payload: error }) => {
                if (error) {
                    state.error = error.message
                }
                state.status = 'failed'
            })
            .addCase(addExpenseThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchExpensesThank.fulfilled, (state, { payload }: PayloadAction<Expense[]>) => {
                state.data = payload
            })
    }
});

export const selectStatus = (state: AppState) => state.expenses.status
export const selectError = (state: AppState) => state.expenses.error
export const selectExpenses = (state: AppState) => state.expenses.data

export const { addExpense, setStatus, deleteExpense } = expenses.actions;

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
    async (userId, thunkAPI) => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${userId}/expenses`, { cache: 'no-store' })
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

export const deleteExpenseThunk = createAsyncThunk<void, { userId: string | undefined, expenseId: string }>(
    "expenses/deleteExpense",
    async (args, thunkAPI) => {
        try {
            const { userId, expenseId } = args
            if (!userId) {
                throw new Error('You are not authorized')
            }
            const res = await fetch(`http://localhost:3000/api/users/${userId}/expenses`, {
                method: "DELETE",
                body: JSON.stringify({ expenseId }),
                cache: 'no-store'
            })
            res.ok && thunkAPI.dispatch(deleteExpense(expenseId))
        } catch (error) {
            return thunkAPI.rejectWithValue(error as Error)
        }
    }
)


export default expenses.reducer;
