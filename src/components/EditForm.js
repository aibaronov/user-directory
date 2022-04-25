import React from 'react'
import './Card.css'

function EditForm(props){
    const firstName = props.userData.name.first;
    // let firstName = props.userState.firstName.toString();
    // console.log(props.userState.firstName.toString());
    const lastName = props.userData.name.last;
    const city = props.userData.city;
    const country = props.userData.country;
    const title = props.userData.title;
    const employer = props.userData.employer;
    const movies = props.userData.favoriteMovies;
    return(
        <div className='Card'>
            <h1>Edit User: {firstName} {lastName}</h1>
            <form className='user-form' onSubmit={props.formSubmit}>
                <div className='sub-entry'>
                    <label>First Name : </label><br></br>
                    <input type='text' onChange={props.firstNameHandler}></input><br></br>

                    <label>Last Name : </label><br></br>
                    <input type='text'onChange={props.lastNameHandler}></input><br></br>
                    
                    <label>City : </label><br></br>
                    <input type='text' onChange={props.cityHandler}></input><br></br>

                    <label>Country : </label><br></br>
                    <input type='text' onChange={e=> props.countryHandler(e.target.value)}></input><br></br>
                </div>
                    
                <div className='sub-entry'>   
                    <label>Employer : </label><br></br>
                    <input type='text' onChange={props.employerHandler}></input><br></br>
                    
                    <label>Title : </label><br></br>
                    <input type='text' onChange={props.titleHandler}></input><br></br>
                    
                    <label>Movies : </label><br></br>
                    <input type='text' onChange={props.movieHandler}></input><br></br>
                    <button type='submit' className='submit-button' value='submit'>Submit</button>
                </div>
            </form>
        </div>
    )

}

export default EditForm;