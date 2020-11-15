import React from 'react';

function Outputs(props) {
    return (
        <div>
            {`Viewing results for ${props.requirements.code}: ${props.requirements.title} (${props.requirements.implementation_year})${props.requirements.specialisations.length ? ` with specialisations: ${props.requirements.specialisations.join(', ')}` : ''}`}
        </div>
    )
}

export default Outputs;