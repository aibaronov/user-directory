
import React, {useState, useEffect} from 'react';
import {confirm} from 'react-confirm-box';
import './App.css';
import Card from './components/Card';
import Navigation from './components/Navigation';
import NewForm from './components/NewForm';
import EditForm from './components/EditForm';
import data from './data'

const userArray = data.map((user) => {return user});
let globalID = userArray.length;

function App() {
  const [index, setIndex] = useState(0);
  const [userData, setUserData] = useState(data);
  const [userInfo, setUserInfo] = useState(userData[0]);
  const [displayedComponent, setDisplayedComponent] = useState('Card');


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [employer, setEmployer] = useState('');
  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState([]);


  const firstNameHandler = (event) => {
      setFirstName(event.target.value);
  }
  const lastNameHandler = (event) =>{
      setLastName(event.target.value);
  }
  const cityHandler = (event) => {
      setCity(event.target.value);
  }

  const countryHandler = (event) => {
      setCountry(event.target.value);
  }
  const employerHandler = (event) =>{
      setEmployer(event.target.value);
  }
  const titleHandler = (event) => {
      setTitle(event.target.value);
  }
  const movieHandler = (event) =>{
      let movieArray = event.target.value.split(',');
      setMovies(movieArray);
  }

  useEffect(() => {
    // console.log(newUser);
    setUserInfo(userData[index]);
    // setUserData(userData);
    // if(index === userData.length - 1){
    // setUserInfo(userData[0]);
    // }
    // else{
    // setUserInfo(userData[index]);
    // }
  }, [index, userData])

  // useEffect(() => {
  //   const getCurrentIndex = localStorage.getItem('index');
  //   console.log(`Index from useEffect: ${getCurrentIndex}`)
  //   setIndex(getCurrentIndex);
  //   console.log(`UpdatedIndex: ${index}`)
  // }, [index])

  const updateIndex = (data) => {
    for(let i = 1; i <= data.length; i++){
      data[i-1].id = i;
    }
  }
  const nextUserSelect = (event) => {
    event.preventDefault();
    const newIndex = (index+1)%userData.length;
    console.log(newIndex);
    localStorage.setItem('index', Number(newIndex));
    setIndex(newIndex);
    // setUserInfo(userArray[index]);
  }
  
  const previousUserSelect = (event) => {
    if(index === 0){
      console.log(userData.length-1)
      console.log(userData[userData.length-1])
      setIndex(userData.length-1);
      setUserInfo(userData[userData.length-1]);
    }
    else{
    setIndex(previous => previous-1);
    }
  }

  const renderNewUserForm = (event) => {
    event.preventDefault();
    setDisplayedComponent('NewForm')
  }

  const renderEditUserForm = (event) => {
    event.preventDefault();
    // setEditUserBool(true);
    setDisplayedComponent('EditForm')
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Form submit handler called');
    globalID = userData.length + 1;
    const createdUser = {
      id: globalID,
      name: { first: firstName, last: lastName },
      city: city,
      country: country,
      employer: employer,
      title: title,
      favoriteMovies: movies
    }
    const newUserData = [...userData];
    newUserData.push(createdUser);
    setUserData(newUserData);
    console.log(userData);
    setDisplayedComponent('Card');
    
  }

  const editFormHandler = (event) => {
    event.preventDefault();
    console.log(userInfo);
    userInfo.name.first = firstName;
    userInfo.name.last = lastName;
    userInfo.city = city;
    userInfo.country = country;
    userInfo.title = title;
    userInfo.employer = employer;
    userInfo.movies = movies;

    setDisplayedComponent('Card');

  }

  const deleteUserHandler = async (event) => {
    event.preventDefault();
    const confirmDelete = await confirm("Are you sure you wish to delete this user?");
    if (confirmDelete){
    const updatedData = userData.filter((user) => {
      return Number(user.id) !== (index + 1)
      }
    )
    updateIndex(updatedData);
    setUserData(updatedData);
    console.log(userData);
    setUserInfo(userData[index + 1]);
    }
    else{
      return;
    }
    console.log(userData);
  }

  const renderInner = ()=> {
    if(displayedComponent === 'Card'){
      return(
        <Card userData={userInfo}/>
      )
    }
    else if(displayedComponent === 'NewForm'){
      return (
          <NewForm 
              formSubmit={formSubmitHandler}
              firstNameHandler={firstNameHandler}
              lastNameHandler={lastNameHandler}
              cityHandler={cityHandler}
              countryHandler={countryHandler}
              employerHandler={employerHandler}
              titleHandler={titleHandler}
              movieHandler={movieHandler}
              />
      )
    }
    else if(displayedComponent === 'EditForm'){
      return (
        <EditForm 
          userData={userInfo}
          formSubmit={editFormHandler}
          firstNameHandler={firstNameHandler}
          lastNameHandler={lastNameHandler}
          cityHandler={cityHandler}
          countryHandler={countryHandler}
          employerHandler={employerHandler}
          titleHandler={titleHandler}
          movieHandler={movieHandler}/>
      )
    }
  }

  return (
    
    <div className="App">
      <div className='header'>
        <h1>Home</h1>
      </div>
      <div className='container'>
        
        {/* {newUserBool === true ? 
          <NewForm 
          formSubmit={formSubmitHandler}
          firstNameHandler={firstNameHandler}
          lastNameHandler={lastNameHandler}
          cityHandler={cityHandler}
          countryHandler={countryHandler}
          employerHandler={employerHandler}
          titleHandler={titleHandler}
          movieHandler={movieHandler}/>: 
          <Card userData={userInfo}/>
          } */}
          {renderInner()}

        <Navigation 
            nextUserSelect={nextUserSelect} 
            previousUserSelect={previousUserSelect}
            newUserForm = {renderNewUserForm}
            editUserForm = {renderEditUserForm}
            deleteUser = {deleteUserHandler}
            />
      </div>
    </div>
    
  );
}

export default App;
