import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SubMap from "../maps/SubMap";
import GraphDropdown from "../widgets/GraphDropdown";
import Trips from "../graphs/Trips";
import Spending from "../graphs/Spending";

const SubPage = () => {

    const distName = useParams().distName

    // states
    const [graph, setGraph] = useState('trips')

    return (
        <div>
            <SubMap distName={distName} />
            <GraphDropdown graph={graph} setGraph={setGraph} />
            {/* {graph === 'trips' && <Trips distName={distName} />}
            {graph === 'spending' && <Spending />}
            {graph === 'mobility' && <div>mobility</div>}
            {graph === 'employment' && <div>employment</div>} */}
        </div>
    )
}

export default SubPage