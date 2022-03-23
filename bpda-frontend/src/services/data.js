import axios from "axios";

const baseUrl = 'http://localhost:3001/api/data'

const getTrips = async (name) => {
    const response = await axios.get(`${baseUrl}/trips/${name}`)
    return response.data
}

const getSpending = async (name) => {
    const response = await axios.get(`${baseUrl}/spending/${name}`)
    return response.data
}

export default {
    getTrips, getSpending
}