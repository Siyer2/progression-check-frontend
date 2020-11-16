import React from 'react';
import {
    Card,
    Accordion
} from 'react-bootstrap';

import RenderRule from '../RenderRule';

function Rules(props) {
    const coreCourseOutputs = props.requirements.map((coreRequirement, i) => {
        // Render rules here
        return (
            <RenderRule key={i+props.ruleName} rule={coreRequirement} ruleName={props.ruleName} index={i}/>
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
                    {coreCourseOutputs}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default Rules;