import logo from './logo.svg';
import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Main/>
      {/* <Routes>
        <Route path = '/' element = {<Main />}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
