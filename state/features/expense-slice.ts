import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FormDataType } from "@/components/AddExpanseForm";

type InitialState = {
    expenses: Expense[];
    status: Status;
    error: string | string[];
};
type Expense = {
    id: "";
    title: "";
    amount: 0;
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
        deleteExpense: (state, action) => {
        },
        editExpense: () => {
        },
    },
});

export const
 { editExpense, deleteExpense } = expenses.actions;
export default expenses.reducer;
