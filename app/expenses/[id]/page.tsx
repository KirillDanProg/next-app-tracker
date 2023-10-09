"use client"

import { ExpensesPieChart } from "@/components/expenses-pie-chart";
import { pieChartDataSetThunk } from "@/state/features/pie-chart/pie-chart-thunks";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";
import { selectExpenses } from "@/state/features/expenses/expense-slice";

const Expenses = () => {
    const dispatch = useAppDispatch()
    const expenses = useAppSelector(selectExpenses)

    useEffect(() => {
        dispatch(pieChartDataSetThunk(expenses))
    }, [ expenses, dispatch ])

    return (
        <section className="flex flex-col gap=4 text-white">
            <ExpensesPieChart/>
        </section>
    )
}

export default Expenses
