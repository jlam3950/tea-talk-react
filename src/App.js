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
import { useState, useEffect } from 'react';


function App() {
  const [favoritedTeas, setFavoritedTeas] = useState([]);
  const [currentTeas, setCurrentTeas] = useState([]);

  useEffect(() => {
    getTeas();
    // why does this render twice 
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

  const teaArray = [
    {
      name: "Korean Corn Tea(better than it sounds)",
      image: '/images/doubleSpiceChai.png',
      brand: "Dong Suh",
      type: "White",
      rating: "*****",
      id: '1'
    },
    {
      name: "Elevated Matcha",
      image: '/images/doubleSpiceChai.png',
      brand: "Nikon",
      type: "Green",
      rating: "****",
      id: '2'
    },
    {
      name: "Flower Power",
      image: '/images/doubleSpiceChai.png',
      brand: "Bloomingtea",
      type: "Herbal",
      rating: "***",
      id: '3'
    },
  ] 

  return (
    <div className="App d-flex flex-column min-vh-100">
    <NavigationBar />
      <Routes>
        <Route path = '/' element = {<Main teaArray = {currentTeas} addTea = {addTea} />}></Route>
        <Route path = 'login' element = {<Login />}></Route>
        <Route path = 'userProfile' element = {<UserProfile />}></Route>
      </Routes>
    <Footer />
    </div>
  );
}

export default App;
