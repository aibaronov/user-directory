import React from 'react';
import './Card.css';



function NewForm(props){

    return(
        <div className='Card'>
            <form className='user-form' onSubmit={props.formSubmit}>
                <div className='sub-entry'>
                    <label>First Name: </label><br></br>
                    <input type='text' onChange={props.firstNameHandler}></input><br></br>

                    <label>Last Name: </label><br></br>
                    <input type='text' onChange={props.lastNameHandler}></input><br></br>
                    
                    <label>City: </label><br></br>
                    <input type='text' onChange={props.cityHandler}></input><br></br>

                    <label>Country: </label><br></br>
                    <input type='text' onChange={props.countryHandler}></input><br></br>
                </div>
                    
                <div className='sub-entry'>   
                    <label>Employer: </label><br></br>
                    <input type='text' onChange={props.employerHandler}></input><br></br>
                    
                    <label>Title: </label><br></br>
                    <input type='text' onChange={props.titleHandler}></input><br></br>
                    
                    <label>Favorite Movies: </label><br></br>
                    <input type='text'onChange={props.movieHandler}></input><br></br>
                    <button type='submit' className='submit-button' value='submit'>Submit</button>
                </div>
            </form>
        </div>
    )

}

export default NewForm;