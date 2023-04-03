import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { ListContext } from '../App';
import { FaUserCircle, FaMinusCircle, FaPen } from 'react-icons/fa';
import ProfileList from './ProfileList';

const UserProfile = () => {
  const { userProfile, list, refreshTeaList, editMode, setEditMode } = useContext(ListContext);
  const [ teaEdit, setTeaEdit ] = useState(false)
  const [ listRender, setListRender ] = useState([]);
  const [ infoEdit, setInfoEdit ] = useState(false);
  const [ currentList, setCurrentList ] = useState([]);
  const [flag, setFlag ] = useState(false);
  const [render, setRender] = useState(true);

  // everything is working, except tea list isn't refreshing with delete

  const deleteTea = async (teaID, selectedList) => {
    // setFlag(false);
    const id = userProfile._id; 
    const url = `http://localhost:5100/users/${id}/tealists`; 
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
         'content-type': 'application/json',
        },
        body: JSON.stringify({
         "action": "remove tea",
         "payload":{
            "listName": selectedList, 
            "tea": teaID
         }
        })
      })
    setListRender(list[selectedList]);
    const data = await res.json(); 
    console.log(data);
    refreshTeaList(userProfile._id);
    if(list[currentList].length === 0){
      setTeaEdit(false);
    }
}

const deleteList = async (name) => {
  const id = userProfile._id; 
  const url = `http://localhost:5100/users/${id}/tealists`; 
  const res = await fetch(url, {
      method: 'PATCH',
      headers: {
       'content-type': 'application/json',
      },
      body: JSON.stringify({
       "action": "delete list",
       "payload":{
          "listName": name, 
       }
      })
    })

  const data = await res.json(); 
  console.log(data);
  refreshTeaList(userProfile._id);
  if(list[currentList].length === 0){
    setEditMode(false);
  }
}

  // check on this, causes console error due to length 
  // refreshTeaList(userProfile._id);

  const storeListTeas = (listName) => {
    refreshTeaList(userProfile._id);
    setListRender(list[listName]);
    setFlag(true);
    setCurrentList(listName);
  }
  
  return (
   <div className ='userProfileContainer container-fluid vh-100'>
    <div className="userProfileHeader  h-25 d-flex align-items-end mx-5">
      <div className="userProfileCard w-50 h-50 d-flex align-items-center">
        <div className="userProfileLogo">
          <FaUserCircle />
        </div>
        <div className="userProfileName"> 
          {userProfile.username ? userProfile.username : ''}
        </div>
      </div>
    </div>

    <div className="userProfileContainer d-flex justify-content-center mx-5">
      <div className="userDescriptionDisplayContainer col-8">
        <div className="userProfileDescription p-4 my-4 h5" style ={{'backgroundColor': 'rgba(250,246,246)'}}>
          <div className="d-flex justify-content-between"> 
            <div style = {{'fontWeight': 'bold'}}> 
              Profile Info
            </div>
            <div className = 'userProfileEditBtn'> 
              <FaPen style = {{height: '.75em'}} onClick = {() => setInfoEdit(!infoEdit)}/>
            </div>
          </div> 
          <hr></hr>
          <div className="location">
            { infoEdit ? <><FaMinusCircle style = {{color: 'red'}}/> Location: Bloomington, IN</> : 'Location: Bloomington, IN' }
          </div>
        </div>
        <div className="userProfileDisplayTeas p-4 my-4 h5" style ={{'backgroundColor': 'rgba(250,246,246)'}}>
          <div className="d-flex justify-content-between" > 
            <div style = {{'fontWeight': 'bold'}}> 
              Tea Info
            </div>
            <div className = 'userProfileEditBtn'> 
              <FaPen style = {{height: '.75em'}} onClick = {() => setTeaEdit(!teaEdit)}/>
            </div>
          </div> 
            <hr></hr>
            { flag ? 
             listRender?.map((tea, i) => {
                return  <div id = {tea.name} key = {i}>
                          <span>{teaEdit ? <FaMinusCircle style = {{color : 'red'}} onClick = {() => {deleteTea(tea._id, currentList )}}/> : ''}</span>
                          <ProfileList name={tea.name} brand={tea.brand} type={tea.type} rating={tea.rating} img={tea.imageURL} id={tea._id} key={i} />
                        </div>
              })
            : "Click on a tea list to display saved teas"
            }
            
        </div>
      </div>
      <div className="userTeaListContainer col-4 my-4" style ={{'backgroundColor': 'rgba(250,246,246)'}}>
        <div className="userProfileList p-0 m-4 h-75 h5">
          <div className="d-flex justify-content-between"> 
            <div style = {{'fontWeight': 'bold'}}> 
              My Tea List
            </div>
            <div className = 'userProfileEditBtn'> 
              <FaPen style = {{height: '.75em'}} onClick = {() => setEditMode(!editMode)}/>
            </div>
          </div> 
          <hr></hr>
          {

            list ? 
  
        Object.keys(list).map((listName, i) => {
            return <div key = {i} className ='listNameContainer'>
                        <div className ='listName' id={listName} onClick= {(e) => storeListTeas(e.target.id)}>
                        <span>{editMode ? <FaMinusCircle className ='mx-1' style = {{color : 'red'}} onClick = {() => {deleteList(listName)}}/> : ''}</span>
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