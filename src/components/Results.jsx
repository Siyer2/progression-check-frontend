import React from 'react';
import { connect } from 'react-redux';

import Outputs from './Outputs';

function Results(props) {
    if (!props.requirements.isGettingRequirements) {
        console.log("FINAL", props.requirements.requirements);
    }

    return (
        !props.requirements.isGettingRequirements && !props.requirements.requirements.code ?  <NoSetProgram /> 
        :
        <>
            {props.requirements.isGettingRequirements ? 
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                    : <Outputs requirements={props.requirements.requirements}/>
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