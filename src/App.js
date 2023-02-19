import logo from './logo.svg';
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
import Container from 'react-bootstrap/Container';


function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
    <NavigationBar />
      <Routes>
        <Route path = '/' element = {<Main />}></Route>
        <Route path = 'login' element = {<Login />}></Route>
        <Route path = 'userProfile' element = {<UserProfile />}></Route>
      </Routes>
    <Footer />
    </div>
  );
}

export default App;
