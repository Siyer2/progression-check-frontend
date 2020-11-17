import React, { useState } from 'react';
import { connect } from 'react-redux';

import Outputs from './Outputs';
import { getRemainingRequirements } from '../helperFunctions';

import fakeRequirements from '../fakeRequirements.json';

function Results(props) {
    const [remainingRequirements, setRemainingRequirements] = useState(fakeRequirements); // This should be props.requirements.requirements not fakeRequirements
    
    if (!props.requirements.isGettingRequirements) {
        console.log("FINAL", props.requirements.requirements);
    }

    async function addedCourse(course) {
        const newRemainingRequirements = await getRemainingRequirements(course, remainingRequirements);

        setRemainingRequirements(prevState => {
            return {...prevState, newRemainingRequirements}
        });
    }

    // TESTING 
    return (
        <>
            <Outputs requirements={remainingRequirements} addedCourse={addedCourse}/>
        </>
    )

    // ACTUAL
    return (
        // <Outputs />
        !props.requirements.isGettingRequirements && !props.requirements.requirements.code ? <NoSetProgram /> 
        :
        <>
            {props.requirements.isGettingRequirements ? 
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                    : 
                    <>
                        <Outputs requirements={props.requirements.requirements} addedCourse={addedCourse}/>
                    </>
            }
        </>
        
    )
}

function NoSetProgram() {
    return (
        <div>No program set. Please select a program to view results.</div>
    )
}

const mapStateToProps = state => {
    return {
        requirements: state.requirements
    };
};

export default connect(mapStateToProps, null)(Results);