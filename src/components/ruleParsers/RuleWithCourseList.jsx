import React from 'react';
import {
    OverlayTrigger, 
    Tooltip, 
    Card,
    ListGroup, 
    Accordion
} from 'react-bootstrap';

import { stripHtml } from '../../helperFunctions';

function RuleWithCourseList(props) {
    const coreCourseOutputs = props.requirements.map((coreRequirement, i) => {
        return (
            <div key={i} >
                <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            {stripHtml(coreRequirement.M.description.S)}
                        </Tooltip>
                    }
                >
                    <Card.Title>
                        {
                            coreRequirement.M.credit_points && coreRequirement.M.credit_points_max ?
                                `Finish between ${coreRequirement.M.credit_points.S} and ${coreRequirement.M.credit_points_max.S} UOC of the following courses:`
                                :
                                coreRequirement.M.credit_points ?
                                    `Finish ${coreRequirement.M.credit_points.S} UOC of the following courses:`
                                    :
                                    coreRequirement.M.credit_points_max ?
                                        `Finish up to ${coreRequirement.M.credit_points_max.S} UOC of the following courses:`
                                        :
                                        stripHtml(coreRequirement.M.description.S)
                        }
                    </Card.Title>
                </OverlayTrigger>
                <ListGroup variant="flush">
                    {coreRequirement.M.courses.L.map((course, i) => {
                        return (<ListGroup.Item key={i + course.M.code.S}>{course.M.code.S} ({course.M.credit_points.S} UOC)</ListGroup.Item>)
                    })}
                </ListGroup>
            </div >
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

export default RuleWithCourseList;