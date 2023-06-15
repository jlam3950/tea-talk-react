import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Main from './components/Main';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import TeaForm from "./components/TeaForm"
import TeaPage from "./components/TeaPage"
import AlertBar from './components/AlertBar';
import { FaUserCircle } from 'react-icons/fa';
export const ListContext = createContext();
export const ThemeContext = createContext(null);

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

  const [list, setList] = useState(teaList);
  const [renderDelete, setRenderDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTeas, setCurrentTeas] = useState([]);
  const [selectedTea, setSelectedTea] = useState({});
  const [userProfile, setUserProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertInfo, setAlertInfo] = useState('');
  const [ currentList, setCurrentList] = useState([]);
  const [isDarkMode, setDarkMode] = useState(true);
  const [profilePic, setProfilePic ] = useState(<FaUserCircle/>);
  const [backgroundPic, setBackgroundPic ] = useState('');

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    window.localStorage.setItem('dark_mode_toggle', JSON.stringify(checked))
  };

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('dark_mode_toggle'));
    if( data !== null) setDarkMode(data);
  }, [isDarkMode])



  useEffect(() => { 
    const data = JSON.parse(window.localStorage.getItem('my_user'));
    if ( data !== null ) setUserProfile((data))
  }, [])

  useEffect(() => { 
    const data = JSON.parse(window.localStorage.getItem('my_user'))
    if( data !== null ){
      if(userProfile._id !== undefined){
        refreshTeaList(userProfile._id);
      }
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
  }, []); 

  const refreshTeaList = async (id) => {
    const url = `http://localhost:5100/users/${id}`; 
    const res = await fetch(url, {
        method: 'GET'
    })
    const data = await res.json();
    const refreshedList = data.teaLists; 
    setList(refreshedList);

    if(list){
      if(list.length < 0){
        setEditMode(false);
      }
    }
}

  const setUserData = (data, userTeaList) => {
    setUserProfile(data);
    setList(userTeaList);
    };

  // Get All Teas
  const getTeas = async () => { 
    const url = ('http://localhost:5100/teas');
    const res = await fetch(url);
    const data = await res.json();
    setCurrentTeas(data);
  }
  // Get One Individual Tea
  const getTea = async (id) => { 
    const url = "http://localhost:5100/teas/" + id;        
    const res = await fetch(url);
    const data = await res.json();
    setSelectedTea(data);
  }

  return (
    <div className="App d-flex flex-column min-vh-100">
      <ListContext.Provider value = {{alertInfo, currentList, currentTeas, 
                                      loggedIn, list, userProfile, selectedTea,
                                      editMode, alertFlag, isDarkMode, profilePic, backgroundPic,renderDelete, 
                                      setProfilePic, setBackgroundPic,setRenderDelete,
                                      setCurrentList, setAlertInfo, setAlertFlag, 
                                      refreshTeaList, setEditMode, setUserProfile, 
                                      setList, setUserData, setDarkMode, toggleDarkMode, getTea, setSelectedTea}}>
          <NavigationBar />
            <AlertBar/>
              <Routes>
                <Route path = '/' element = {<Main teaArray = {currentTeas} />}></Route>
                <Route path = 'login' element = {<Login />}></Route>
                <Route path = 'register' element = {<Register />}></Route>
                <Route path = 'userProfile' element = {<UserProfile />}></Route>
                <Route path = 'teaForm' element = {<TeaForm />}></Route>
                <Route path = 'teaPage/:id' element = {<TeaPage />}></Route>
              </Routes>
          <Footer />
      </ListContext.Provider>
    </div>
  );
}

export default App;
