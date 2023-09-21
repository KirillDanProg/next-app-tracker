import {createSlice} from "@reduxjs/toolkit";

type InitialState = {
    expenses: Expense[]
    status: Status
    error: string | string[]
}
type Expense = {
    id: "",
    name: "",
    amount: 0
}
type Status = 'idle' | 'loading' | 'success' | 'failed'

const initialState = {
    expenses: [],
    status: 'idle',
    error: ''
} as InitialState

const expenses = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action) => {

        },
        deleteExpense: (state, action) => {

        },
        editExpense: () => {

        }
    },
})


export const {addExpense, editExpense, deleteExpense} = expenses.actions
export default expenses.reducer
