import React from 'react';
import { 
    Jumbotron, 
    Container,
    Accordion
} from 'react-bootstrap';

import Rules from './ruleParsers/Rules';
import CourseSelector from './CourseSelector';
import { ruleIsCompleted } from '../helperFunctions';

function DisplayRulesToDo(props) {
    // Check if every rule is done
    const isCompleted = (rule) => (ruleIsCompleted(rule) === true ? true : false);
    const allRulesCompleted = props.requirements.every(isCompleted);

    return (
        allRulesCompleted ? null : 
        <Rules ruleName={props.ruleName} requirements={props.requirements} eventKey={props.eventKey}/>
    )
}

function DisplayRules(props) {
    return (
        <Accordion defaultActiveKey="0">
            {props.requirements.coreCourses && (props.requirements.coreCourses.length || props.requirements.coreCourses.L.length) ? <DisplayRulesToDo ruleName="Core Courses" requirements={props.requirements.coreCourses.length ? props.requirements.coreCourses : props.requirements.coreCourses.L} eventKey={"0"} /> : null}
            {props.requirements.prescribedElectives && (props.requirements.prescribedElectives.length || props.requirements.prescribedElectives.L.length) ? <DisplayRulesToDo ruleName="Prescribed Electives" requirements={props.requirements.prescribedElectives.length ? props.requirements.prescribedElectives : props.requirements.prescribedElectives.L} eventKey={"1"}/> : null}
            {props.requirements.oneOfTheFollowings && (props.requirements.oneOfTheFollowings.length || props.requirements.oneOfTheFollowings.L.length) ? <DisplayRulesToDo ruleName="One of the Following" requirements={props.requirements.oneOfTheFollowings.length ? props.requirements.oneOfTheFollowings : props.requirements.oneOfTheFollowings.L} eventKey={"2"}/> : null}
            {props.requirements.generalEducation && (props.requirements.generalEducation.length || (props.requirements.generalEducation.L && props.requirements.generalEducation.L.length)) ? <DisplayRulesToDo ruleName="General Education" requirements={props.requirements.generalEducation.length ? props.requirements.generalEducation : props.requirements.generalEducation.L} eventKey={"3"}/> : null}
            {props.requirements.limitRules && (props.requirements.limitRules.length || props.requirements.limitRules.L.length) ? <DisplayRulesToDo ruleName="Limits" requirements={props.requirements.limitRules.length ? props.requirements.limitRules : props.requirements.limitRules.L} eventKey={"4"}/> : null}
            {props.requirements.freeElectives && (props.requirements.freeElectives.length || props.requirements.freeElectives.L.length) ? <DisplayRulesToDo ruleName="Free Electives" requirements={props.requirements.freeElectives.length ? props.requirements.freeElectives : props.requirements.freeElectives.L} eventKey={"5"}/> : null}
            {props.requirements.maturityRules && (props.requirements.maturityRules.length || props.requirements.maturityRules.L.length) ? <DisplayRulesToDo ruleName="Order of Courses" requirements={props.requirements.maturityRules.length ? props.requirements.maturityRules : props.requirements.maturityRules.L} eventKey={"6"}/> : null}
            {props.requirements.informationRules && (props.requirements.informationRules.length || props.requirements.informationRules.L.length) ? <DisplayRulesToDo ruleName="Other Important Info" requirements={props.requirements.informationRules.length ? props.requirements.informationRules : props.requirements.informationRules.L} eventKey={"7"}/> : null}
        </Accordion>
    )
}

function Outputs(props) {
    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h1>{`${props.requirements.code}: ${props.requirements.title} (${props.requirements.implementation_year})`}</h1>
                    {props.requirements.specialisations && props.requirements.specialisations.length && <h2>Specialisations: {props.requirements.specialisations.join(', ')}</h2>}
                </Container>
                <h5>
                    You have at least {props.requirements.minimumUOC} UOC to go
                </h5>
                <CourseSelector addedCourse={props.addedCourse}/>
            </Jumbotron>

            <DisplayRules requirements={props.requirements}/>
        </>
    )
}

export default Outputs;