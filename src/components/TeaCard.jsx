import React from "react";
import AddTeaModal from './AddTeaModal';
import { FaPlusSquare, FaStar } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState } from 'react';
// import { AlertBar } from './AlertBar';

const TeaCard = (props) => {
  const { refreshTeaList, loggedIn, userProfile, setAlertFlag, alertFlag, setAlertInfo } = useContext(ListContext);
  const [modalShow, setModalShow] = useState(false);
  const [selectedtea, setselectedtea] = useState({});

  const openModal = (props) => {
    console.log(userProfile);
    refreshTeaList(userProfile._id)
    setModalShow(true);
    setselectedtea(props);
  }

  const setAlert = (alert) => {
    setAlertFlag(true);
    setAlertInfo(alert);
    
    setTimeout(() => {
      setAlertFlag(false);
      setAlertInfo('');
    }, 2000)
  }

  return (
    <div className="teaCard d-flex my-3 py-2 px-2">
      <div className="col-3 d-flex justify-content-center align-items-center">
        {/* <img className = 'teaCardImg' src={props.img} alt="" /> */}
        {/* will update ^ teas once images are loaded in db */}
        <img className = 'teaCardImg' src='/images/doubleSpiceChai.png' alt="" />
      </div>
      <div className="col-7">
        <div className="mr-2">
          <div className="cardTitle my-0 py-0"> 
            {props.name}
          </div>
          <div className="d-flex cardSubtitleAndType">
            <div className=" cardSubtitle col-4">
              {props.brand}
            </div>
            <div className="cardSubtitle col-2">
              {props.type}
            </div>
          </div>
          <div className="">
            {props.rating}
          </div>
          <div className="cardDescription">
            "Black tea is a kind of tea made from leaves of Camellia sinensis. Often, it is stronger in taste than other varieties of tea, like green tea or oolong."
          </div>
        </div>
        Tea Rating: <FaStar/><FaStar/><FaStar/><FaStar/>(4.6) | <span>200 ratings</span>
      </div>
      <div className="teaPlus col-2 d-flex justify-content-center align-items-center">
        { userProfile.length !== 0 ? 
             <>
             <FaPlusSquare onClick = {() => openModal(props)}/>
                <AddTeaModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                selectedtea = {selectedtea}
                /> 
            </>: 
        <FaPlusSquare onClick = {() => setAlert('Sign in to save tea...')}/> }
      </div>
    </div>
  );
};

export default TeaCard;
