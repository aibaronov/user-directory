import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/userCard.css'
import data from '../data'

const UserCard = (props) => {

  const users = props.data.slice(0, data.length)
  const [index, setIndex] = useState(0)
  let [show, setShow] = useState(false)

  let user = users[index]

  const newUser = {
      id: users.length + 1,
      name: { 
        first: '', 
        last: ''},
      city: '',
      country: '',
      employer: '',
      title: '',
      favoriteMovies: [
        "",
        "",
        ""
      ]
    }

  const next = () => {
    setIndex(index + 1)
  }

  const previous = () => {
    setIndex(index - 1)
  }

  const deleteUser = () => {
    data.splice(index, 1)
    index <= data.length - 1 ? setIndex(index + 1) : setIndex(index - 1)
  }

  const addUser = (e) => {
    e.preventDefault()
    users.push(newUser)
    console.log(users)
  }

  const handleChange = (e) => {
    let key = e.target.name
    newUser[key] = e.target.value
    console.log(newUser)
  }

  const handleNameChange = (e) => {
    let key = e.target.name
    newUser.name[key] = e.target.value
    console.log(newUser)
  }

  const handleMovie = (e) => {
    let index = e.target.name
    newUser.favoriteMovies[index] = e.target.value
  }

  const showForm = () => {
    setShow(!show)  
  }

  return (
    <div id='background'>
      <div id='card-main'>
      <form className={show ? 'user-form' : 'hide-form'}>
          <p>First Name: <input name='first' onChange={handleNameChange}/></p>
          <p>Last Name: <input name ='last' onChange={handleNameChange}/></p>
          <p>City: <input name='city' onChange={handleChange}/></p>
          <p>Country: <input name='country' onChange={handleChange}/></p>
          <p>Job Title: <input name='title' onChange={handleChange}/></p>
          <p>Employer: <input name='employer' onChange={handleChange}/></p>
          <h3>Favorite Movies</h3>
          <p>1: <input name='0' onChange={handleMovie}/></p>
          <p>2: <input name='1' onChange={handleMovie}/></p>
          <p>3: <input name='2'  onChange={handleMovie}/></p>
          <button onClick={addUser}>Add User</button>
       </form>     
        <h2 id='count'>{user.id}/{users.length}</h2>
          <div id='card-data'>
              <span>
                  <h1 id='name'>{user.name.first} {user.name.last}</h1>
                  <div id='line'></div>
              </span>
              <div id='details'>
                  <div className='info-container'>
                    <h3 className='user-info'>From: </h3><p>{user.city}, {user.country}</p>
                  </div>
                  <div className='info-container'>
                    <h3 className='user-info'>Job Title: </h3><p>{user.title}</p>
                  </div>
                  <div className='info-container'>
                    <h3 className='user-info'>Employer: </h3>
                    <p>{user.employer}</p>
                  </div>
              </div>
              <div id='movies'>
                  <h3 className='user-info'>Favorite Movies:</h3>
                  <p className='movie'>1. {user.favoriteMovies[0]}</p>
                  <p className='movie'>2. {user.favoriteMovies[1]}</p>
                  <p className='movie'>3. {user.favoriteMovies[2]}</p>
              </div>
          </div>          
      </div>
      <div id='button-container'>
      {index === 0 ? <button className=' nav-button hide'></button> : <button className='nav-button' onClick={previous}>{'<'} Previous</button>}
          <div id='edit-container'>
            <button className='info-button'>Edit</button>
            <button className='info-button'onClick={deleteUser}>Delete</button>
            <button className='info-button' onClick={showForm}>New</button>
          </div>          
          {index === data.length - 1 ? <p className=' nav-button hide'></p> : <button className='nav-button' onClick={next}>Next {'>'}</button>}
        </div>
    </div>
  )
}

export default UserCard