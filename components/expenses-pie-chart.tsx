"use client"

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, Colors } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useAppSelector } from "@/state/store";
import { selectChartData } from "@/state/features/pie-chart/pie-chart-slice";

ChartJS.register(ArcElement, Tooltip, Legend, Title, Colors);

export const ExpensesPieChart = () => {
    const data = useAppSelector(selectChartData)
    const options = {
        responsive: true,
        layout: {
            padding: 10
        },
        plugins: {

            colors: {
                enabled: true
            },
            tooltip: {},
            legend: {
                labels: {
                    color: "#ffffffd9"
                }
            },
            title: {
                display: true,
                text: 'Chart of expenses by category',
                color: "#ffffffd9",
                padding: 30,
                font: {
                    size: 18,
                    weight: "bold",
                }
            },
        }
    } as const

    return (
        <div className='w-full'>
            <Pie data={data} options={options}/>
        </div>
    )
}

