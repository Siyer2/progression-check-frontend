import React from 'react';
import { 
    Jumbotron, 
    Container,
    Accordion
} from 'react-bootstrap';

import Rules from './ruleParsers/Rules';

import fakeRequirements from '../fakeRequirements.json';

function DisplayRules(props) {
    console.log("Reqs", props.requirements);
    return (
        <Accordion defaultActiveKey="0">
            {props.requirements.coreCourses && props.requirements.coreCourses.length && <Rules ruleName="Core Courses" requirements={props.requirements.coreCourses} eventKey={"0"} />}
            {props.requirements.prescribedElectives && props.requirements.prescribedElectives.length && <Rules ruleName="Prescribed Electives" requirements={props.requirements.prescribedElectives} eventKey={"1"}/>}
            {props.requirements.oneOfTheFollowings && props.requirements.oneOfTheFollowings.length && <Rules ruleName="One of the Following" requirements={props.requirements.oneOfTheFollowings} eventKey={"2"}/>}
            {props.requirements.generalEducation && props.requirements.generalEducation.length && <Rules ruleName="General Education" requirements={props.requirements.generalEducation} eventKey={"3"}/>}
            {props.requirements.limitRules && props.requirements.limitRules.length && <Rules ruleName="Limits" requirements={props.requirements.limitRules} eventKey={"4"}/>}
            {props.requirements.freeElectives && props.requirements.freeElectives.length && <Rules ruleName="Free Electives" requirements={props.requirements.freeElectives} eventKey={"5"}/>}
            {props.requirements.maturityRules && props.requirements.maturityRules.length && <Rules ruleName="Order of Courses" requirements={props.requirements.maturityRules} eventKey={"6"}/>}
            {props.requirements.informationRules && props.requirements.informationRules.length && <Rules ruleName="Other Important Info" requirements={props.requirements.informationRules} eventKey={"7"}/>}
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
            <DisplayRules requirements={fakeRequirements}/>
        </>
    )
}

export default Outputs;