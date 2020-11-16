import React from 'react';
import { 
    Jumbotron, 
    Container, 
    Card, 
    ListGroup, 
    OverlayTrigger, 
    Tooltip, 
    Accordion
} from 'react-bootstrap';

import fakeRequirements from '../fakeRequirements.json';

function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

function CoreCourses(props) {
    console.log("requirements", props.coreCourses);
    const coreCourseOutputs = props.coreCourses.map((coreRequirement, i) => {
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
            <Accordion.Toggle as={Card.Header} eventKey="0">
                <h5>
                    Core Courses
                </h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    {coreCourseOutputs}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

function Rules(props) {
    return (
        <Accordion defaultActiveKey="0">
            {props.requirements.coreCourses.length && <CoreCourses coreCourses={props.requirements.coreCourses} />}
        </Accordion>
    )
}

function Outputs(props) {
    // TODO: CHANGE fakeRequirements to props.requirements
    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h1>{`${fakeRequirements.code}: ${fakeRequirements.title} (${fakeRequirements.implementation_year})`}</h1>
                    {fakeRequirements.specialisations.length && <h2>Specialisations: {fakeRequirements.specialisations.join(', ')}</h2>}
                </Container>
                <h5>
                    You have at least {fakeRequirements.minimumUOC} UOC to go
                </h5>
            </Jumbotron>
            <Rules requirements={fakeRequirements}/>
        </>
    )
}

export default Outputs;