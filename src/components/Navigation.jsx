import React from 'react';


function Navigation(props){
const nextUser = props.nextUserSelect;
const previousUser = props.previousUserSelect;
return(
    <div className='nav-buttons'>
        <button className='previous-button' onClick={previousUser}>Previous</button>
        <button className='next-button' onClick={nextUser}>Next</button>
    </div>
    )
}

export default Navigation