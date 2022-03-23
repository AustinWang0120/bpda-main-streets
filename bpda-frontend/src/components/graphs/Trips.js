import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import dataService from '../../services/data';

const Trips = ({distName}) => {

    // data states
    const [trips, setTrips] = useState(null)

    // get data
    useEffect(async () => {
        const data = await dataService.getTrips()
        setTrips(data.trips)
    }, [])

    // avoid to render null
    if (!trips) {
        return (
            <div></div>
        )
    }

    // data manipulation
    const labels = trips.map(trip => trip['Row Labels'])
    const datasets = [{ label: 'trips', data: trips.map(trip => parseInt(trip['Share'])) }]

    return (
        <Line
            datasetIdKey="id"
            data={{labels, datasets}}
        />
    )
}

export default Trips