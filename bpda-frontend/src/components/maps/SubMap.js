import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import Business from "./Business";
import mapService from "../../services/maps";

const SubMap = ({distName}) => {

    // data states
    const [mainstreetdistricts, setMainStreetDistricts] = useState(null)

    // get data
    useEffect(async () => {
        const districts = await mapService.getMainStreetDistricts()
        setMainStreetDistricts(districts)
    }, [])

    // avoid to render null
    if (!mainstreetdistricts) {
        return (
            <div></div>
        )
    }

    // data manipulation
    const targetDist = mainstreetdistricts.features.find(street => {
        return (street.properties.NAME.toLowerCase().replace(/[^a-zA-Z]+/g, '') === distName)
    })
    const center = [targetDist.geometry.coordinates[0][0][1], targetDist.geometry.coordinates[0][0][0]]

    return (
        <MapContainer center={center} zoom={18} id="sub-map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup>
                <Polygon
                    positions={targetDist.geometry.coordinates.map(list => (
                        list.map(location => [location[1], location[0]])
                    ))}
                />
                <Business distName={distName} />
            </FeatureGroup>
        </MapContainer>
    )
}

export default SubMap