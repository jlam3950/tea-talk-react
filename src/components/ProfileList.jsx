import React from "react";
import { FaStar } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState } from 'react';

const ProfileList = (props) => {
  const { refreshTeaList, loggedIn, userProfile } = useContext(ListContext);
  const [modalShow, setModalShow] = useState(false);
  const [selectedtea, setselectedtea] = useState({});

  const openModal = (props) => {
    console.log(userProfile);
    refreshTeaList(userProfile._id)
    setModalShow(true);
    setselectedtea(props);
  }

  return (
    <div className="teaCard d-flex my-3 py-2 px-2">
      <div className="col-3 d-flex justify-content-center align-items-center">
        {/* <img className = 'teaCardImg' src={props.img} alt="" /> */}
        {/* will update ^ teas once images are loaded in db */}
        <img className = 'profileTeaListImg' src='/images/doubleSpiceChai.png' alt="" />
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
    </div>
  );
};

export default ProfileList;
