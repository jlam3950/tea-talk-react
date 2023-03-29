import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { ListContext } from '../App';
import { FaUser, FaUserCircle, FaMinus, FaPen } from 'react-icons/fa';
import ProfileList from './ProfileList';

const UserProfile = () => {
  const { userProfile, setUserProfile, list, refreshTeaList } = useContext(ListContext);
  const [ listRender, setListRender ] = useState([]);
  const [ infoEdit, setInfoEdit ] = useState(false);
  const [ teaInfoEdit, setTeaInfoEdit ] = useState(false);
  const [flag, setFlag ] = useState(false);

  const storeListTeas = (listName) => {
    refreshTeaList(userProfile._id);
    setListRender(list[listName]);
    setFlag(true);
    console.log(listRender);
  }
  

  return (
   <div className = 'container-fluid py-2 vh-100'>
    <div className="userProfileHeader h-25 d-flex align-items-end mx-4 ">
      {/* <img className = 'userProfileBackgroundImg' src='/images/userprofile-tea.png' alt="" /> */}
      <div className="userProfileCard w-50 h-50 d-flex align-items-center">
        <div className="userProfileLogo">
          <FaUserCircle />
        </div>
        <div className="userProfileName"> 
          {userProfile.username ? userProfile.username : ''}
        </div>
      </div>
    </div>

    <div className="d-flex">
      <div className="userDescriptionDisplayContainer col-8 ">
        <div className="userProfileDescription p-4 m-4 h5">
          <div className="d-flex justify-content-between"> 
            <div> 
              Profile Info
            </div>
            <div> 
              <FaPen onClick = {() => setInfoEdit(!infoEdit)}/>
            </div>
          </div> 
          <hr></hr>
          <div className="location">
            { infoEdit ? <><FaMinus/> Location: Bloomington, IN</> : 'Location: Bloomington, IN' }
          </div>
        </div>
        <div className="userProfileDisplayTeas p-4 m-4 h5">
          <div className="d-flex justify-content-between"> 
            <div> 
              Tea Info
            </div>
            <div> 
              <FaPen onClick = {() => setTeaInfoEdit(!teaInfoEdit)}/>
            </div>
          </div> 
            <hr></hr>
            { flag ? 
             listRender.map((tea, i) => {
                return <ProfileList name={tea.name} brand={tea.brand} type={tea.type} rating={tea.rating} img={tea.image} id = {tea._id} key ={i} />;
              })
            : "Click on a tea list to display saved teas"
            }
            
        </div>
      </div>
      <div className="userTeaListContainer col-4 ">
        <div className="userProfileList p-4 m-4 h-75 h5">
          <div className="d-flex justify-content-between"> 
            <div> 
              My Tea List
            </div>
            <div> 
              <FaPen/>
            </div>
          </div> 
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