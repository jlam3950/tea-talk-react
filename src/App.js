import './App.css';
import Main from './components/Main';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import TeaForm from "./components/TeaForm"
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AlertBar from './components/AlertBar';
export const ListContext = createContext();

function App() {
  
  const teaList = {
    'Favorite Teas':[
        {
            "name": "British Blend",
            "brand": "Tetly",
            "type": "Black",
            "description": "tea is yum",
            "rating": 5, 
        }
    ],
    'Least Favorite Teas':[
        {
            "name": "British Brown Blend",
            "brand": "W/C",
            "type": "Brown",
            "description": "tea is NOT yum",
            "rating": 3,
        }
    ]
  }

  const [list, setList ] = useState(teaList);
  const [editMode, setEditMode ] = useState(false);
  const [currentTeas, setCurrentTeas] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [loggedIn, setLoggedIn ] = useState(false);
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertInfo, setAlertInfo] = useState('');

  useEffect(() => { 
    const data = JSON.parse(window.localStorage.getItem('my_user'));
    if ( data !== null ) setUserProfile((data))
  }, [])

  // is this firing? 
  useEffect(() => { 
    const data = JSON.parse(window.localStorage.getItem('my_user'))
    if( data !== null ){
      const userTeaLists = data.TeaLists;
      if ( userTeaLists !== null ){
        setList(userTeaLists); 
        setLoggedIn(true);
      }      
    }
  }, [loggedIn])
 
  useEffect(() => {
    if(loggedIn){
      setList(userProfile.teaLists);
    } 
  }, [loggedIn, userProfile])

  useEffect(() => {
    if(userProfile.length !== 0){
      window.localStorage.setItem('my_user', JSON.stringify(userProfile))
    }
  }, [userProfile])

  useEffect(() => {
    getTeas();
  }); 

  const refreshTeaList = async (id) => {
    const url = `http://localhost:5100/users/${id}`; 
    const res = await fetch(url, {
        method: 'GET'
    })
    const data = await res.json();
    const refreshedList = data.teaLists; 
    setList(refreshedList);
    if(!list.length){
      setEditMode(false);
    }
}
  // useEffect(() => {
  //   refreshTeaList()
  // }, [list])


  const setUserData = (data, userTeaList) => {
    setUserProfile(data);
    setList(userTeaList);
    };

  const getTeas = async () => { 
    const url = ('http://localhost:5100/teas');
    const res = await fetch(url);
    const data = await res.json();
    setCurrentTeas(data);
  }

  return (
    <div className="App d-flex flex-column min-vh-100">
      <ListContext.Provider value = {{alertInfo, setAlertInfo, currentTeas, loggedIn, list, userProfile, editMode, alertFlag, setAlertFlag, refreshTeaList, setEditMode, setUserProfile, setList, setUserData}} >
          <NavigationBar />
            <AlertBar/>
              <Routes>
                <Route path = '/' element = {<Main teaArray = {currentTeas} />}></Route>
                <Route path = 'login' element = {<Login />}></Route>
                <Route path = 'register' element = {<Register />}></Route>
                <Route path = 'userProfile' element = {<UserProfile />}></Route>
                <Route path = 'teaForm' element = {<TeaForm />}></Route>
              </Routes>
          <Footer />
      </ListContext.Provider>
    </div>
  );
}

export default App;
