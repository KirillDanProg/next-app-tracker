import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Expense } from "@/components/AddExpanseForm";

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
        addExpense: (state, {payload}: {payload: Expense}) => {
            state.expenses.push(payload)
        },
        deleteExpense: (state, action) => {

        },
        editExpense: () => {
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(addExpenseThunk.fulfilled, (state, action) => {
    //             debugger
    //         })
    // }
});

export const { editExpense, deleteExpense, addExpense } = expenses.actions;
export const addExpenseThunk = createAsyncThunk<any, { id: string | undefined, formData: Expense }>(
    'expenses/addExpense', async ({ id, formData }, thunkAPI) => {
        if (!id) {
            return thunkAPI.rejectWithValue("error")
        }
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'POST',
            cache: "no-cache",
            body: JSON.stringify(formData)
        })
        if (!res.ok) {
            return thunkAPI.rejectWithValue("error")
        }
        thunkAPI.dispatch(addExpense(formData))
        return res.json()
    }
)

export default expenses.reducer;
