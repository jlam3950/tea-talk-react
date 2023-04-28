import React from "react";
import { FaStar } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState } from 'react';
import { TeaRating } from "./TeaRating";

const ProfileList = (props) => {
  const { tea } = props
  const { currentList, setCurrentList,refreshTeaList, userProfile} = useContext(ListContext);
  const [flag, setFlag ] = useState(false);

  const deleteTea = async (teaID, selectedList) => {
    setFlag(false);
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
      const data = await res.json(); 
      console.log(data);
      refreshTeaList(userProfile._id);
      setCurrentList(selectedList);
}

  return (
    <div className="teaCard d-flex my-3 py-2 px-2">
      <div className="col-3 d-flex justify-content-center align-items-center">
        <img className = 'profileTeaListImg' src={tea.imageURL} alt="" />
      </div>
      <div className="col-8 user-card-description">
        <div className="mr-2">
          <div className="my-0 py-0 profile-list-name"> 
            {tea.name}
          </div>
          <div className="d-flex">
            <div className="col-4 profile-list-brand">
              {tea.brand}
            </div>
            <div className="col-2 profile-list-tea">
              {tea.type}
            </div>
          </div>
          <div className="">
            {tea.rating}
          </div>
        </div>
        <div className="ratingBar d-flex" style = {{"fontSize": ".628em", "lineHeight": "1.5em"}}>
        {/* Tea Rating: <FaStar/><FaStar/><FaStar/><FaStar/>(4.6) | <span>200 ratings</span> */}
        <TeaRating tea={tea} compact={true}  />
        </div>
      </div>
      <div className = 'col-1' onClick = {() => {deleteTea(tea._id, currentList )}}>{props.edit ? <button className ='btn btn-danger my-3 p-2' style = {{'fontSize': '.5em'}}> Delete </button> : ''}</div>
    </div>
  );
};

export default ProfileList;
