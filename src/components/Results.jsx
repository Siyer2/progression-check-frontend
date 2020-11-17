import React, { useState } from 'react';
import { connect } from 'react-redux';

import Outputs from './Outputs';
import { getRemainingRequirements } from '../helperFunctions';
import { updateRemainingRequirements } from '../actions/requirementsAction';

import fakeRequirements from '../fakeRequirements.json';

function Results(props) {
    const [remainingRequirements, setRemainingRequirements] = useState('');

    async function addedCourse(course) {
        const newRemainingRequirements = await getRemainingRequirements(course, props.requirements.requirements);
        console.log("Remaining requirements", newRemainingRequirements);
        setRemainingRequirements(prevState => {
            return {...prevState, newRemainingRequirements}
        });
        props.updateRemainingRequirements(newRemainingRequirements);
    }

    // TESTING 
    // return (
    //     <>
    //         <Outputs requirements={remainingRequirements} addedCourse={addedCourse}/>
    //     </>
    // )

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

const mapDispatchToProps = dispatch => {
    return {
        updateRemainingRequirements: (newRemainingRequirements) => {
            dispatch(updateRemainingRequirements(newRemainingRequirements))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);