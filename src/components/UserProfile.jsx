import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { ListContext } from '../App';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import TeaCard from './TeaCard';

const UserProfile = () => {
  const { userProfile, setUserProfile, list, refreshTeaList } = useContext(ListContext);
  const [ listRender, setListRender ] = useState([])
  const [flag, setFlag ] = useState(false);

  const storeListTeas = (listName) => {
    refreshTeaList(userProfile._id);
    setListRender(list[listName]);
    setFlag(true);
    console.log(listRender);
  }
  

  return (
   <div className = 'container-fluid py-2 vh-100 border'>
    <div className="userProfileHeader border h-25 d-flex align-items-end mx-4 ">
      {/* <img className = 'userProfileBackgroundImg' src='/images/userprofile-tea.png' alt="" /> */}
      <div className="userProfileCard w-50 h-50 border d-flex align-items-center">
        <div className="userProfileLogo">
          <FaUserCircle />
        </div>
        <div className="userProfileName"> 
          {userProfile.username ? userProfile.username : ''}
        </div>
      </div>
    </div>

    <div className="d-flex">
      <div className="userDescriptionDisplayContainer col-8 border">
        <div className="userProfileDescription border p-4 m-4 h5">    
          Profile Info
          <hr></hr>
          <div className="location">
            Location: Bloomington, IN
          </div>
        </div>
        <div className="userProfileDisplayTeas border p-4 m-4 h5">
            Tea Info
            <hr></hr>
            { flag ? 
             listRender.map((tea, i) => {
                return <TeaCard name={tea.name} brand={tea.brand} type={tea.type} rating={tea.rating} img={tea.image} id = {tea._id} key ={i} />;
              })
            : ""
            }
            
        </div>
      </div>
      <div className="userTeaListContainer col-4 border">
        <div className="userProfileList p-2 m-4 h-75 border h5">
          {userProfile.username}'s List
          <hr></hr>
          {

            list ? 
  
        Object.keys(list).map((listName, i) => {
            return <div key = {i} className ='listNameContainer'>
                        <div className ='listName' id={listName} onClick= {(e) => storeListTeas(e.target.id)}>
                            {listName}
                        </div>
                        <div className ='listLength'>
                            {`Saved Teas: ${list[listName].length}`}
                         </div>
                   </div>         
        })

        : ''
    }
        </div>
      </div>
    </div>

   </div>
  
  )
}

export default UserProfile