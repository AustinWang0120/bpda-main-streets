import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import mapService from "../../services/maps";

const Business = ({distName}) => {

    // data states
    const [mainStreetBusiness, setMainStreetBusiness] = useState(null)

    // get data
    useEffect(async () => {
        const business = await mapService.getMainStreetBusiness(distName)
        setMainStreetBusiness(business)
    }, [])
    console.log(mainStreetBusiness)

    // avoid to render null
    if (!mainStreetBusiness) {
        return (
            <div></div>
        )
    }

    return (
        <>
            {mainStreetBusiness.map((point, index) => (
                <Marker position={[point.latitude, point.longitude]} key={index}>
                    <Popup>
                        Name: {point.business_name}<br />
                        Address: {point.street_address}<br />
                        <Link to={`/fix`}>need a correction?</Link>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

export default Business