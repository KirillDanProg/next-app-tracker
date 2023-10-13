"use client"

import { ExpensesPieChart } from "@/components/expenses-pie-chart";
import { pieChartDataSetThunk } from "@/state/features/pie-chart/pie-chart-thunks";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";
import { selectExpenses } from "@/state/features/expenses/expense-slice";
import { DataTableDemo } from "@/components/expenses-table";

const Expenses = () => {
    const dispatch = useAppDispatch()
    const expenses = useAppSelector(selectExpenses)

    useEffect(() => {
        dispatch(pieChartDataSetThunk(expenses))
    }, [ expenses, dispatch ])

    return (
        <section className="flex text-white flex-wrap min-w-full ">
            <div className="w-1/2">
                <ExpensesPieChart/>
            </div>
            <div className="w-1/2">
                <DataTableDemo/>
            </div>
        </section>
    )
}

export default Expenses
