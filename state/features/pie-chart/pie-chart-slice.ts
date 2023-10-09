import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/state/store";
import { Expense } from "@/types/expense";

type DataSet = {
    label: string,
    data: any,
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
}
type InitialState = {
    data: {
        labels: string[],
        datasets: DataSet[]
    }
    options: any
};

export const initialState = {
    data: {
        labels: [],
        datasets: [
            {
                data: [],
                label: '',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ]
    },
    options: {
        plugins: {
            title: {
                text: 'Custom Chart Title',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    }
} as InitialState

const pieChart = createSlice({
    name: "pieChart",
    initialState,
    reducers: {
        setLabels: (state, { payload }: PayloadAction<Expense[]>) => {
            const categories = payload.map((el: Expense) => el.category || 'other')
            state.data.labels = Array.from(new Set(categories))
        },
        setChartDataSet: (state, { payload }: PayloadAction<number[]>) => {
            state.data.datasets[0].data = payload
        }
    }
});

export const selectChartDataset = (state: AppState) => state.pieChart.data.datasets[0]
export const selectChartLabels = (state: AppState) => state.pieChart.data.labels
export const selectChartData = (state: AppState) => state.pieChart.data

export const { setLabels, setChartDataSet } = pieChart.actions

export default pieChart.reducer;
