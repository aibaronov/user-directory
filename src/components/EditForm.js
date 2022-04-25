import React from 'react'
import './Card.css'

function EditForm(props){
    const firstName = props.userData.name.first;
    const lastName = props.userData.name.last;
    const city = props.userData.city;
    const country = props.userData.country;
    const title = props.userData.title;
    const employer = props.userData.employer;
    const movies = props.userData.favoriteMovies;
    return(
        <div className='Card'>
            <h1>Edit User</h1>
            <form className='user-form' onSubmit={props.formSubmit}>
                <div className='sub-entry'>
                    <label>{firstName} : </label><br></br>
                    <input type='text' onChange={props.firstNameHandler}></input><br></br>

                    <label>{lastName} : </label><br></br>
                    <input type='text'onChange={props.lastNameHandler}></input><br></br>
                    
                    <label>{city} : </label><br></br>
                    <input type='text' onChange={props.cityHandler}></input><br></br>

                    <label>{country} : </label><br></br>
                    <input type='text' onChange={props.countryHandler}></input><br></br>
                </div>
                    
                <div className='sub-entry'>   
                    <label>{employer} : </label><br></br>
                    <input type='text' onChange={props.employerHandler}></input><br></br>
                    
                    <label>{title} : </label><br></br>
                    <input type='text' onChange={props.titleHandler}></input><br></br>
                    
                    <label>{movies}: </label><br></br>
                    <input type='text' onChange={props.movieHandler}></input><br></br>
                    <button type='submit' className='submit-button' value='submit'>Submit</button>
                </div>
            </form>
        </div>
    )

}

export default EditForm;