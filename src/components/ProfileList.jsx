import React from "react";
import { FaStar } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState } from 'react';

const ProfileList = (props) => {
  const { list, currentList, setCurrentList,refreshTeaList, loggedIn, userProfile, listRender, setListRender } = useContext(ListContext);
  const [flag, setFlag ] = useState(false);
  // const [modalShow, setModalShow] = useState(false);
  // const [selectedtea, setselectedtea] = useState({});

  // const openModal = (props) => {
  //   console.log(userProfile);
  //   refreshTeaList(userProfile._id)
  //   setModalShow(true);
  //   setselectedtea(props);
  // }

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
      setListRender(list[selectedList]);
      refreshTeaList(userProfile._id);
}

  return (
    <div className="teaCard d-flex my-3 py-2 px-2">
      <div className="col-3 d-flex justify-content-center align-items-center">
        <img className = 'profileTeaListImg' src={props.img} alt="" />
      </div>
      <div className="col-8">
        <div className="mr-2">
          <div className="my-0 py-0"> 
            {props.name}
          </div>
          <div className="d-flex">
            <div className="col-4">
              {props.brand}
            </div>
            <div className="col-2">
              {props.type}
            </div>
          </div>
          <div className="">
            {props.rating}
          </div>
        </div>
        Tea Rating: <FaStar/><FaStar/><FaStar/><FaStar/>(4.6) | <span>200 ratings</span>
      </div>
      <div className = 'col-1' onClick = {() => {deleteTea(props.id, currentList )}}>{props.edit ? <button className ='btn btn-danger my-3 p-2' style = {{'fontSize': '.5em'}}> Delete </button> : ''}</div>
    </div>
  );
};

export default ProfileList;
