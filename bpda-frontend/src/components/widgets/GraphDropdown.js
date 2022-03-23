import React from "react";
import { Form } from "react-bootstrap";

const GraphDropdown = ({setGraph}) => {

    // change graph
    const graphOnChange = (event) => {
        setGraph(event.target.value)
    }

    return (
        <Form.Select aria-label="Default select example" onChange={graphOnChange}>
            <option value={'trips'}>Trips</option>
            <option value={'spending'}>Spending</option>
            <option value={'mobility'}>Mobility</option>
            <option value={'employment'}>Employment</option>
        </Form.Select>
    )
}

export default GraphDropdown