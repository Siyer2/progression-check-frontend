import { getRequirements } from '../models/apiCalls';

//==== Action Creators ====//
function requestRequirements() {
    return {
        type: 'REQUEST_REQUIREMENTS'
    }
}

function finishRequirements(data) {
    console.log(data);
    return {
        type: 'FINISH_REQUIREMENTS',
        user: data
    }
}

function failedRequirements(error) {
    return {
        type: 'FAILED_REQUIREMENTS',
        error
    }
}

function clearRequirements() {
    return {
        type: 'CLEAR_REQUIREMENTS'
    }
}

//==== User Requests ====//
export function getProgramRequirements(code, implementation_year, specialisations) {
    return async function(dispatch) {
        try {
            dispatch(requestRequirements());

            const requirements = await getRequirements(code, implementation_year, specialisations);
            dispatch(finishRequirements(requirements.data));
        } catch (error) {
            console.log("ERROR GETTING PROGRAM REQUIREMENTS", error);
            dispatch(failedRequirements(error.toString()));
        }
    }
}