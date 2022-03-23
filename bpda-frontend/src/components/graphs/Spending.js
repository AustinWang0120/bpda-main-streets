import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

const Spending = () => {

    // temp data
    const spending = require('../temp/spending/Washington Gateway Weekly.json').spending
    // console.log(spending)

    // data manipulation
    const labels = spending.map(record => record['Row Labels'])
    const datasets = [{ label: 'spending', data: spending.map(record => record['Change in In-Person Mastercard Spending'])}]

    return (
        <Line
            datasetIdKey="id"
            data={{labels, datasets}}
        />
    )
}

export default Spending