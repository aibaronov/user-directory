
import React, {useState, useEffect} from 'react';
import './App.css';
import Card from './components/Card';
import Navigation from './components/Navigation';
import data from './data'

const userArray = data.map((user) => {return user});

function App() {
  const [index, setIndex] = useState(0);
  const [userInfo, setUserInfo] = useState(userArray[0]);


  console.log(`Current index: ${index}`);

  useEffect(() => {
    setUserInfo(userArray[index]);
  }, [index])

  const nextUserSelect = (event) => {
    event.preventDefault();
    setIndex(previous => {return (previous + 1)%userArray.length});
    // setUserInfo(userArray[index]);
  }
  
  const previousUserSelect = (event) => {
    if(index < 1){
      setIndex(userArray.length - 1);
      setUserInfo(userArray[index]);
    }
    else{
    setIndex(previous => {return (previous - 1)%userArray.length});
    // setUserInfo(userArray[index]);
    }
  }

  return (
    
    <div className="App">
      <h1>User Data:</h1>
      <Card userData={userInfo}/>
      <Navigation 
          nextUserSelect={nextUserSelect} 
          previousUserSelect={previousUserSelect}
          />
    </div>
    
  );
}

export default App;
