import React from 'react';
import { useContext, useState } from 'react';
import { ListContext } from '../App';
import { FaPen } from 'react-icons/fa';
import ProfileList from './ProfileList';
import Nav from 'react-bootstrap/Nav';
import ProfilePicModal from './ProfilePicModal';
import TeaForm from './TeaForm';

const UserProfile = () => {
  const { currentList, setCurrentList, userProfile, list, refreshTeaList, editMode, setEditMode, isDarkMode, backgroundPic, setBackgroundPic, profilePic, setProfilePic } = useContext(ListContext);
  const [ teaEdit, setTeaEdit ] = useState(false)
  const [ infoEdit, setInfoEdit ] = useState(false);
  const [flag, setFlag ] = useState(false);
  const [modalShow, setModalShow] = useState(false);

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

  const storeListTeas = (listName) => {
    refreshTeaList(userProfile._id); 
    setFlag(true);
    setCurrentList(listName);
  }
  
  return (
    <div className = 'profile-root container-fluid' style = {isDarkMode? {}: {'background-color': 'black'}}>
   <div className ='userProfileContainer container-fluid' style = {{'minHeight': '100vh'}}>
    <div className="userProfileHeader d-flex align-items-end">
          {/* adjust this value for mobile responsiveness. take out inline style */}
      <div className="userProfileCard w-50 h-50 d-flex align-items-center">
        <div className="userProfileLogo" onClick = {() => setModalShow(true)} style = {{cursor : 'pointer'}}>
          {profilePic}
        </div>
            <ProfilePicModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            /> 
        <div className="userProfileName"> 
          {userProfile.username ? userProfile.username : ''}
        </div>
      </div>
    </div>

    <div className="userProfileContainer d-flex justify-content-center mx-sm-5">
      <div className="userDescriptionDisplayContainer col-8">
        <div className="userProfileDescription p-sm-4 my-sm-4 h5" 
        style = {isDarkMode? {'backgroundColor': 'rgba(250,246,246)'}: {backgroundColor: 'rgb(51,51,51)', color: 'white'}}
        >
          <div className="d-flex justify-content-between"> 
            <div style = {{'fontWeight': 'bold'}}> 
              Profile Info
            </div>
            <div className = 'userProfileEditBtn'> 
              <FaPen style = {{height: '.75em'}} onClick = {() => setInfoEdit(!infoEdit)}/>
            </div>
          </div> 
          <hr></hr>
          <div className="location d-flex justify-content-between">
            { infoEdit ? <><div className ='mx-2'> Location: Bloomington, IN  </div> <button className ='btn btn-danger p-2' style = {{'fontSize': '.5em'}}> Delete </button></> : 'Location: Bloomington, IN' }
          </div>
        </div>
        <div className="userProfileDisplayTeas p-4 my-4 h5" 
             style = {isDarkMode? {'backgroundColor': 'rgba(250,246,246)'}: {backgroundColor: 'rgb(51,51,51)', color: 'white'}}
             >
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
             list[currentList]?.map((tea, i) => {
              return  <div id = {tea.name} key = {i}>
                        <ProfileList name={<Nav.Link href={`/teaPage/${tea._id}`} style ={{color: 'black'}}>{tea.name}</Nav.Link>} tea ={tea} key={i} edit = {teaEdit}/>
                      </div>
             })
            : "Click on a tea list to display saved teas"
            }
            
        </div>
      </div>
      <div className="userTeaListContainer col-4 my-4" 
            style = {isDarkMode? {'backgroundColor': 'rgba(250,246,246)'}: {backgroundColor: 'rgb(51,51,51)', color: 'white'}}>
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
                        <div className ='listName location d-flex justify-content-between' id={listName} onClick= {(e) => storeListTeas(e.target.id)}>
                          {listName}                           
                          { editMode ? <><div className ='mx-2'> </div> <button className ='btn btn-danger p-2' onClick = {() => {deleteList(listName)}} style = {{'fontSize': '.5em'}}> Delete </button></> :  
                            <div className ='listLength my-1'>
                                {`Saved Teas: ${list[listName].length}`}
                            </div>}
                        </div>
                   </div>         
        })
        : ''
    }
        </div>
      </div>
    </div>

   </div>
   </div>
  
  )
}

export default UserProfile