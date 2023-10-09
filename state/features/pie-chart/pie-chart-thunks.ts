import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLabels, setChartDataSet } from "./pie-chart-slice";
import { AppState } from "@/state/store";
import { Expense } from "@/types/expense";

type Dictionary = {
    [key: string]: number
}
export const pieChartDataSetThunk = createAsyncThunk<void, Expense[], { state: AppState }>(
    "pieChart/setData",
    async (expenses, thunkAPI) => {
        thunkAPI.dispatch(setLabels(expenses))
        const labels = thunkAPI.getState().pieChart.data.labels
        const dict: Dictionary = {}
        for (let i = 0; i < expenses.length; i++) {
            const index = expenses[i].category || 'other'
            if (dict[index]) {
                dict[index] += Number(expenses[i].amount)
            } else {
                dict[index] = Number(expenses[i].amount)
            }
        }
        const data = []
        for (let i = 0; i < labels.length; i++) {
            if (dict[labels[i]]) {
                data.push(dict[labels[i]])
            }
        }
        thunkAPI.dispatch(setChartDataSet(data))
    }
)
