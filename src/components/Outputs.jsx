import React from 'react';
import { 
    Jumbotron, 
    Container,
    Accordion
} from 'react-bootstrap';

import RuleWithCourseList from './ruleParsers/RuleWithCourseList';

import fakeRequirements from '../fakeRequirements.json';

function Rules(props) {
    return (
        <Accordion defaultActiveKey="0">
            {props.requirements.coreCourses.length && <RuleWithCourseList ruleName="Core Courses" requirements={props.requirements.coreCourses} eventKey={"0"} />}
            {props.requirements.prescribedElectives.length && <RuleWithCourseList ruleName="Prescribed Electives" requirements={props.requirements.prescribedElectives} eventKey={"1"}/>}
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