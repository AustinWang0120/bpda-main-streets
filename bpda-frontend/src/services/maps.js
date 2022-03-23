import axios from "axios";

const baseUrl = 'http://localhost:3001/api/maps'

const getBostonBoundary = async () => {
    const response = await axios.get(`${baseUrl}/bostonboundary`)
    return response.data
}

const getMainStreetDistricts = async () => {
    const response = await axios.get(`${baseUrl}/mainstreetdistricts`)
    return response.data
}

const getMainStreetBusiness = async (name) => {
    const response = await axios.get(`${baseUrl}/mainstreetbusiness/${name}`)
    return response.data
}

export default {
    getBostonBoundary, getMainStreetDistricts, getMainStreetBusiness
}