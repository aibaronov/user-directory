import React from 'react';
import './Navigation.css';


function Navigation(props){
const nextUser = props.nextUserSelect;
const previousUser = props.previousUserSelect;
return(
    <div className='Navigation'>
    <div className='nav-buttons'>
        <button className='previous-button' onClick={previousUser}>Previous</button>
        <button className='next-button' onClick={nextUser}>Next</button>

        <div className='edit-buttons'>
            <button className='edit-button'>Edit</button>
            <button className='edit-button' onClick={props.deleteUser}>Delete</button>
            <button className='edit-button' onClick={props.newUserForm}>New</button>
        </div>
    </div>

    </div>
    )
}

export default Navigation