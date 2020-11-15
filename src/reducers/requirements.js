const initialState = {
    isGettingRequirements: false,
    requirements: {}, 
    error: ''
}

const requirements = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_REQUIREMENTS':
            return Object.assign(
                {},
                state,
                { isGettingRequirements: true, error: '' }
            )
        case 'FINISH_REQUIREMENTS':
            return Object.assign(
                {},
                state,
                { isGettingRequirements: false, requirements: action.requirements }
            )
        case 'FAILED_REQUIREMENTS':
            return Object.assign(
                {},
                state,
                { isGettingRequirements: false, error: action.error }
            )

        case 'CLEAR_REQUIREMENTS':
            return Object.assign(
                {},
                state,
                { requirements: {} }
            )
    
        default:
            return state;
    }
}

export default requirements;