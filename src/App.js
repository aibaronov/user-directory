
import React, {useState, useEffect} from 'react';
import {confirm} from 'react-confirm-box';
import './App.css';
import Card from './components/Card';
import Navigation from './components/Navigation';
import NewForm from './components/NewForm';
import data from './data'

const userArray = data.map((user) => {return user});
let globalID = userArray.length;

function App() {
  const [index, setIndex] = useState(0);
  const [userData, setUserData] = useState(data);
  const [userInfo, setUserInfo] = useState(userData[0]);
  const [newUserBool, setNewUserBool] = useState(false);

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
    if(index === userData.length - 1){
      setUserInfo(userData[0]);
    }
    else{
    setUserInfo(userData[index]);
    }
  }, [index, userData])

  const nextUserSelect = (event) => {
    event.preventDefault();
    setIndex(previous => {return (previous + 1)%userData.length});
    // setUserInfo(userArray[index]);
  }
  
  const previousUserSelect = (event) => {
    if(index < 1){
      setIndex(userData.length - 1);
      setUserInfo(userData[index]);
    }
    else{
    setIndex(previous => {return (previous - 1)%userData.length});
    }
  }

  const renderNewUserForm = (event) => {
    event.preventDefault();
    setNewUserBool(true);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    globalID++;
    const newUser = {
      id: globalID,
      name: { first: firstName, last: lastName },
      city: city,
      country: country,
      employer: employer,
      title: title,
      favoriteMovies: movies
    }

     setUserData([...userData, newUser]);
    setNewUserBool(false);
  }
  const updateIndex = (data) => {
    for(let i = 1; i <= data.length; i++){
      data[i-1].id = i;
    }
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

  return (
    
    <div className="App">
      <div className='header'>
        <h1>Home</h1>
      </div>
      <div className='container'>
        {/* <Card userData={userInfo}/> */}
        {newUserBool === true ? 
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
          }
        <Navigation 
            nextUserSelect={nextUserSelect} 
            previousUserSelect={previousUserSelect}
            newUserForm = {renderNewUserForm}
            deleteUser = {deleteUserHandler}
            />
      </div>
    </div>
    
  );
}

export default App;
