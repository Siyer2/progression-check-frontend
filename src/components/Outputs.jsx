import React from 'react';
import { 
    Jumbotron, 
    Container, 
    Card, 
    ListGroup, 
    OverlayTrigger, 
    Tooltip
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
            <>
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
            </>
        )
    });

    return (
        <Card>
            <Card.Header as="h5">Core Courses</Card.Header>
            <Card.Body>
                {coreCourseOutputs}
            </Card.Body>
        </Card>
    )
}

function Rules(props) {
    return (
        <>
            {props.requirements.coreCourses.length && <CoreCourses coreCourses={props.requirements.coreCourses}/>}
        </>
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
            </Jumbotron>
            <h4>
                You have at least {fakeRequirements.minimumUOC} UOC to go
            </h4>
            <Rules requirements={fakeRequirements}/>
        </>
    )
}

export default Outputs;