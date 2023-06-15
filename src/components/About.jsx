import React from 'react';
import { useContext, useState } from 'react';
import { ListContext } from '../App';
import Nav from 'react-bootstrap/Nav';
import { FaList } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

const About = () => {
const { currentList, setCurrentList, userProfile, list, refreshTeaList, editMode, setEditMode, isDarkMode, backgroundPic, setBackgroundPic, profilePic, setProfilePic } = useContext(ListContext);

  return (
    <div className = 'about-root vh-100 m-0' style = {isDarkMode? {}: {'background-color': 'black'}}>
        <div className="about-splash-img w-100 d-flex flex-column justify-content-center align-items-center">
            <div className = 'about-text-container'>
                <div className="about-main-text">
                    Tea Talk
                </div>
                <div className="about-sub-text" >
                    Discover and find your favorite tea
                </div>
            </div>
        </div>
        <div className="h-25 w-100 d-flex justify-content-center about-rate-cont">
            <div className="about-rate-div d-flex flex-column justify-content-center align-items-center " style = {isDarkMode? {}: {'color': 'white'}}>
                <div className="d-flex justify-content-center">
                    <img className ='about-rate-img' src='/images/search-about3.png' alt ='redrose'/>
                </div>
                <div className="about-img-text mt-3" >
                    Find and Rate Teas
                </div>
                <div className="about-img-subtext text-center px-5">
                    Browse through a wide variety of teas, and find your favorite.
                </div>
            </div>
            <div className="about-rate-div d-flex flex-column justify-content-center align-items-center" style = {isDarkMode? {}: {'color': 'white'}}>
                <div className="d-flex justify-content-center">
                    <img className ='about-rate-img' src='/images/chat-about1.png' alt ='redrose'/>
                </div>
                <div className="about-img-text mt-3">
                    Talk about tea
                </div>
                <div className="about-img-subtext text-center px-5">
                    Browse through a wide variety of teas, and find your favorite.
                </div>
            </div>
        </div>
        <div className="w-100 border d-flex flex-column justify-content-center align-items-center bg-black about-start-discovering">
            <div className =''>
                Start discovering new teas now.
            </div>
            <div className = 'mb-2'>
                <Nav.Link className = 'mx-2' href="/" style ={{color: 'white'}}>
                    <button className = 'px-5 btn btn-dark btn-lg mt-2 border border-white'>Search</button>
                </Nav.Link>
            </div>
        </div>
        <div className="h-25 w-100 border d-flex justify-content-center" style = {isDarkMode? {}: {'color': 'white'}}>
            <div className="about-icon-div d-flex flex-column w-50 justify-content-center align-items-center" >
                <div className="m-2">
                    <FaCoffee/>
                </div>
                <div className="">
                    Find Tea
                </div>
            </div>
            <div className="about-icon-div d-flex flex-column w-50 justify-content-center align-items-center">
                <div className="m-2">
                    <FaCheck/>
                </div>
                <div className="">
                    Rate Tea
                </div>
            </div>
            <div className="about-icon-div d-flex flex-column w-50 justify-content-center align-items-center">
                <div className=" m-2">
                    <FaList />
                </div>
                <div className="">
                    Save Tea
                </div>
            </div>
        </div>
    </div>
  )
}

export default About