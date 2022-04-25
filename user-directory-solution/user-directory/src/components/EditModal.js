import React, {useState} from 'react'
import data from '../data'
import '../styles/modal.css'

const EditModal = (props) => {

    const {user, show, setShow, index, setUser} = props
    
    const updatedUser = {
        id: user.id,
        name: {
            first: user.name.first,
            last: user.name.last
        },
        city: user.city,
        country: user.country,
        title: user.title,
        employer: user.employer,
        favoriteMovies: [user.favoriteMovies[0], user.favoriteMovies[1], user.favoriteMovies[2]]
    }
    
    const handleChange = (e) => {
        let key = e.target.name
        updatedUser[key] = e.target.value
        console.log(updatedUser)
    }

    const handleNameChange = (e) => {
        let key = e.target.name
        updatedUser.name[key] = e.target.value
        console.log(updatedUser)
    }

    const handleMovie = (e) => {
        let index = e.target.name
        updatedUser.favoriteMovies[index] = e.target.value
    }

    const saveUser = () => {
        setUser(updatedUser)
        setShow(!show)
    }

    if(!show) {
        return null
    }


    return (
        <div className='modal'>
            <form className='user-form'>
                <p>First Name: <input name='first' defaultValue={user.name.first} onChange={handleNameChange}/></p>
                <p>Last Name: <input name ='last' defaultValue={user.name.last} onChange={handleNameChange}/></p>
                <p>City: <input name='city' defaultValue={user.city} onChange={handleChange}/></p>
                <p>Country: <input name='country' defaultValue={user.country} onChange={handleChange}/></p>
                <p>Job Title: <input name='title' defaultValue={user.title} onChange={handleChange}/></p>
                <p>Employer: <input name='employer' defaultValue={user.employer} onChange={handleChange}/></p>
                <h3>Favorite Movies</h3>
                <p>1: <input name='0' defaultValue={user.favoriteMovies[0]} onChange={handleMovie}/></p>
                <p>2: <input name='1' defaultValue={user.favoriteMovies[1]} onChange={handleMovie}/></p>
                <p>3: <input name='2' defaultValue={user.favoriteMovies[2]} onChange={handleMovie}/></p>
                <button type='submit' onSubmit={saveUser} >Save Changes</button>
            </form>
        </div>
    )
}

export default EditModal