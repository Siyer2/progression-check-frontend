import React from 'react';
import {
    Accordion, 
    Card, 
    OverlayTrigger, 
    Tooltip
} from 'react-bootstrap';
import { stripHtml } from '../../helperFunctions';

function GeneralEducation(props) {
    console.log("requirements", props);

    const generalEducationOutputs = props.requirements.map((requirement, i) => {
        return (
            <OverlayTrigger
                key={i + requirement.M.credit_points.S}
                placement={'top'}
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        {stripHtml(requirement.M.description.S)}
                    </Tooltip>
                }
            >
                <Card.Title key={i + requirement.M.credit_points.S}>
                    Do {requirement.M.credit_points.S} more of these courses
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
                    {generalEducationOutputs}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default GeneralEducation;