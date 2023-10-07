import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/state/store";
import { Expense } from "@/types/expense";

type InitialState = {
    expenses: Expense[];
    status: Status;
    error: string | string[];
};
type Status = "idle" | "loading" | "success" | "failed";

const initialState = {
    expenses: [],
    status: "idle",
    error: "",
} as InitialState;

const expenses = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        addExpense: (state, { payload }: { payload: Expense }) => {
            state.expenses.push(payload)
        },
        deleteExpense: (state, action) => {

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
            .addCase(addExpenseThunk.rejected, (state, {payload: error}) => {
                if(error) {
                    state.error = error.message
                }
                state.status = 'failed'
            })
            .addCase(addExpenseThunk.pending, (state) => {
                state.status = 'loading'
            })
    }
});

export const getStatusSelector = (state: AppState) => state.expenses.status
export const getErrorSelector = (state: AppState) => state.expenses.error

export const { editExpense, deleteExpense, addExpense, setStatus } = expenses.actions;

export const addExpenseThunk = createAsyncThunk<string, { id: string | undefined, formData: Expense }, {rejectValue: Error}>(
    'expenses/addExpense', async ({ id, formData }, thunkAPI) => {
        try {
            if (!id) {
                throw new Error('You are not authorized')
            }
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
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

export default expenses.reducer;
