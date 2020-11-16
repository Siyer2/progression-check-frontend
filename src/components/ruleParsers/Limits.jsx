import React from 'react';
import {
    OverlayTrigger, 
    Tooltip, 
    Card, 
    Accordion
} from 'react-bootstrap';

import { stripHtml } from '../../helperFunctions';

function Limits(props) {
    console.log("requirements", props);

    const limitsOutputs = props.requirements.map((requirement, i) => {
        return (
            <OverlayTrigger
                key={i}
                placement={'top'}
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        {stripHtml(requirement.M.description.S)}
                    </Tooltip>
                }
            >
                <Card.Title key={i}>
                    {stripHtml(requirement.M.description.S)}
                </Card.Title>
            </OverlayTrigger>
        )
    });
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
                <h3>
                    {props.ruleName}
                </h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body>
                    {limitsOutputs}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default Limits;