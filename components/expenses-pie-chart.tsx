"use client"

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, SubTitle } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useAppSelector } from "@/state/store";
import { selectChartData } from "@/state/features/pie-chart/pie-chart-slice";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const ExpensesPieChart = () => {
    const data = useAppSelector(selectChartData)
    const options = {
        responsive: true,
        plugins: {
            tooltip: {},
            legend: {
                labels: {
                    padding: 20,
                }
            },
            subtitle: {
                display: true,
                text: 'Custom Chart Subtitle'
            },
            title: {
                display: true,
                text: 'Bar Chart'
            }
        }
    }
    return <Pie data={data} width={"600px"} options={options}/>;
}

