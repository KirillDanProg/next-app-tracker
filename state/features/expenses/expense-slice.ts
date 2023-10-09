import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/state/store";
import { Expense } from "@/types/expense";
import { addExpenseThunk, fetchExpensesThank } from "./thunks/expense-thunks";

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
        addExpense: (state, { payload }: { payload: Expense }) => {
            state.data.push(payload)
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

export const { addExpense, setStatus } = expenses.actions;


export default expenses.reducer;
