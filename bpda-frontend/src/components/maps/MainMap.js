import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, FeatureGroup, Polygon, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import mapService from "../../services/maps";

const MainMap = () => {

    // data states
    const [bostonBoundary, setBostonBoundary] = useState(null)
    const [mainstreetdistricts, setMainStreetDistricts] = useState(null)

    // get data
    useEffect(async () => {
        const boundary = await mapService.getBostonBoundary()
        const districts = await mapService.getMainStreetDistricts()
        setBostonBoundary(boundary)
        setMainStreetDistricts(districts)
        // get names
        // districts.features.map(street => {
        //     console.log(street.properties.DIST_NAME)
        // })
    }, [])

    // avoid to render null
    if (!bostonBoundary || !mainstreetdistricts) {
        return (
            <div></div>
        )
    }

    return (
        <MapContainer center={[42.361, -71.057]} zoom={12}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={bostonBoundary} />
            {mainstreetdistricts.features.map((street, index) => (
                <FeatureGroup key={index}>
                    <Popup>
                        {/* first time of parsing dist name */}
                        <Link to={`/${street.properties.DIST_NAME.toLowerCase().replace(/[^a-zA-Z]+/g, '')}`}>
                            {street.properties.NAME}
                        </Link>
                    </Popup>
                    <Polygon
                        positions={street.geometry.coordinates.map(list => (
                            list.map(location => [location[1], location[0]])
                        ))}
                    />
                </FeatureGroup>
            ))}
        </MapContainer>
    )
}

export default MainMap