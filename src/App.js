import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Main from './components/Main';
import NavigationBar from './components/NavigationBar';
import Search from './components/Search';
import Footer from './components/Footer';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState, useEffect, createContext } from 'react';
import FavoriteList from './components/FavoriteList';
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
  const [currentTeas, setCurrentTeas] = useState([]);
  const [favoritedTeas, setFavoritedTeas] = useState([]);


  useEffect(() => {
    getTeas();
  },[]); 

  const getTeas = async () => { 
    const url = ('http://localhost:5100/teas');
    const res = await fetch(url);
    const data = await res.json();
    setCurrentTeas(data);
  }

  // decide on implementation method 
  const addTea = async (tea) => {
   await fetch('http://localhost:5100/teas', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(tea),
  })
  }

  return (
    <ListContext.Provider value = {{list, setList}} >
      <div className="App d-flex flex-column min-vh-100">
        <NavigationBar />
          <Routes>
            <Route path = '/' element = {<Main teaArray = {currentTeas} addTea = {addTea}/>}></Route>
            <Route path = 'login' element = {<Login />}></Route>
            <Route path = 'userProfile' element = {<UserProfile />}></Route>
          </Routes>
        <Footer />
      </div>
    </ListContext.Provider>
  );
}

export default App;
