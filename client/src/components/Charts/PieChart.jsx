import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
    return <Pie
            data={chartData}
            height={400}
            width={1150}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        display: true,
                        color: 'black',
                        anchor: 'center',
                        align: 'center',
                        offset: 0,
                        font: {
                            size: 14,
                        },
                        formatter: (value) => {
                            return value + '%';
                        },
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            boxWidth: 12,
                        },
                    },
                },
            }}
        />
}

export default PieChart;
