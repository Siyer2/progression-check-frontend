import React from 'react';
import { 
    Jumbotron, 
    Container,
    Accordion
} from 'react-bootstrap';

import RuleWithCourseList from './ruleParsers/RuleWithCourseList';
import GeneralEducation from './ruleParsers/GeneralEducation';

import fakeRequirements from '../fakeRequirements.json';

function Rules(props) {
    console.log("Reqs", props.requirements);
    return (
        <Accordion defaultActiveKey="0">
            {props.requirements.coreCourses && props.requirements.coreCourses.length && <RuleWithCourseList ruleName="Core Courses" requirements={props.requirements.coreCourses} eventKey={"0"} />}
            {props.requirements.prescribedElectives && props.requirements.prescribedElectives.length && <RuleWithCourseList ruleName="Prescribed Electives" requirements={props.requirements.prescribedElectives} eventKey={"1"}/>}
            {props.requirements.oneOfTheFollowings && props.requirements.oneOfTheFollowings.length && <RuleWithCourseList ruleName="One of the Following" requirements={props.requirements.oneOfTheFollowings} eventKey={"2"}/>}
            {props.requirements.generalEducation && props.requirements.generalEducation.length && <GeneralEducation ruleName="General Education" requirements={props.requirements.generalEducation} eventKey={"3"}/>}
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
                    {fakeRequirements.specialisations && fakeRequirements.specialisations.length && <h2>Specialisations: {fakeRequirements.specialisations.join(', ')}</h2>}
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