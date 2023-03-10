import React from 'react';

const UserProfile = () => {
  return (
   <div className = 'container-fluid py-2 vh-100 border'>
    <div className="border h-25 d-flex align-items-end mx-4 ">
      <div className="w-50 h-50 border d-flex align-items-center">
        <div className="userProfileImage mx-4">
          Image Here
        </div>
        <div className="userName h2"> 
          Humphrey
        </div>
      </div>
    </div>

    <div className="d-flex">
      <div className="userDescriptionDisplayContainer col-8 border">
        <div className="userProfileDescription border p-4 m-4 h5">
          Description
          <hr></hr>
        </div>
        <div className="userProfileDisplayTeas border p-4 m-4 h5">
            Display Teas
            <hr></hr>
        </div>
      </div>
      <div className="userTeaListContainer col-4 border">
        <div className="userProfileList p-2 m-4 h-75 border h5">
          Tea List
          <hr></hr>
        </div>
      </div>
    </div>

   </div>
  
  )
}

export default UserProfile