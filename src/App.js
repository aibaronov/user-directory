
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


  // const [firstName, setFirstName] = useState(userInfo ? userInfo.name.first : '');
  // const [lastName, setLastName] = useState(userInfo ? userInfo.name.last : '');
  // const [city, setCity] = useState(userInfo ? userInfo.city : '');
  // const [country, setCountry] = useState(userInfo ? userInfo.country : '');
  // const [employer, setEmployer] = useState(userInfo ? userInfo.employer : '');
  // const [title, setTitle] = useState(userInfo ? userInfo.title : '');
  // const [movies, setMovies] = useState(userInfo ? userInfo.favoriteMovies: []);

  const [firstName, setFirstName] = useState(userInfo.name.first);
  const [lastName, setLastName] = useState(userInfo.name.last);
  const [city, setCity] = useState(userInfo.city);
  const [country, setCountry] = useState(userInfo.country);
  const [employer, setEmployer] = useState(userInfo.employer);
  const [title, setTitle] = useState(userInfo.title);
  const [movies, setMovies] = useState(userInfo.favoriteMovies);

  const [updateBool, setUpdateBool] = useState(false);
  const [createNewBool, setCreateNewBool] = useState(false);
  

  const currentUserState = {
    firstName: firstName,
    lastName: lastName,
    city: city,
    country: country,
    employer: employer,
    title: title,
    movies: movies
  }
  const firstNameHandler = (event) => {
    // setFirstNameBool(true);
    setFirstName(event.target.value)
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



  const updateIndex = (data) => {
    for(let i = 1; i <= data.length; i++){
      data[i-1].id = i;
    }
  }
  const nextUserSelect = (event) => {
    event.preventDefault();
    const newIndex = (index+1)%userData.length;
    localStorage.setItem('index', Number(newIndex));
    setIndex(newIndex);
  }
  
  const previousUserSelect = (event) => {
    if(index === 0){
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
    setDisplayedComponent('EditForm')
  }

  const newUserHandler = (event) => {
    event.preventDefault();
    console.log('Form submit handler called');
    setCreateNewBool(true);
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
    setUserData([...userData, createdUser]);
    console.log(userData[userData.length-1]);
    setIndex(0);
    setDisplayedComponent('Card');
  
  }

  const editFormHandler = (event) => {
    event.preventDefault();
    setUpdateBool(true);

    const updatedUser = {
      id: userInfo.id,
      name: { first: firstName, last: lastName },
      city: city,
      country: country,
      employer: employer,
      title: title,
      favoriteMovies: movies
    }
    // setUserInfo(updatedUser);

    userData[index] = updatedUser;
    console.log(updatedUser);
    setIndex((prev) => {return prev + 1});
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
    setIndex(0);
    }
    else{
      return;
    }
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
              formSubmit={newUserHandler}
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
          userState={currentUserState}
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

  useEffect(() => {
    setUserInfo(userData[index]);
    // setFirstName(userData[index].name.first)
  }, [index, userData, nextUserSelect, previousUserSelect])

  useEffect(() => {
    console.log(displayedComponent);
    if(displayedComponent === 'NewForm'){
    setUserInfo(userData[0]);
      setFirstName('');
      setLastName('');
      setCity('');
      setCountry('');
      setEmployer('');
      setTitle('');
      setMovies([]);
    }
    else if(displayedComponent === 'EditForm'){

      setFirstName(userInfo.name.first);
      setLastName(userInfo.name.last);
      setCity(userInfo.city);
      setCountry(userInfo.country);
      setEmployer(userInfo.employer);
      setTitle(userInfo.title);
      setMovies(userInfo.favoriteMovies);
    }

  }, [displayedComponent])

  // useEffect(() => {
  //   // console.log("update function called");
  //   // setFirstName(firstName);
  //   // setLastName(lastName);
  //   // setCity(city);
  //   // setCountry(country);
  //   // setEmployer(employer);
  //   // setCountry(country);
  //   // setEmployer(employer);
  //   // setTitle(title);
  //   // setMovies(movies);

  //   console.log(displayedComponent);
  //   if(displayedComponent === 'EditForm'){
  //   // setUserInfo(userData[0]);
  //     setFirstName(userData.name.first);
  //     setLastName('');
  //     setCity('');
  //     setCountry('');
  //     setEmployer('');
  //     setTitle('');
  //     setMovies([]);
  //   }
    
  //   // setUpdateBool(false);
  // }, [displayedComponent])




  return (
    
    <div className="App">
      <div className='header'>
        <h1>Home</h1>
      </div>
      <div className='container'>
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
