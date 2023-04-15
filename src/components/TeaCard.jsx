import React from "react";
import AddTeaModal from './AddTeaModal';
import { FaPlusSquare, FaStar } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';

const TeaCard = (props) => {
  const { refreshTeaList, userProfile, setAlertFlag, setAlertInfo } = useContext(ListContext);
  const [modalShow, setModalShow] = useState(false);
  const [selectedtea, setselectedtea] = useState({});

  const openModal = (props) => {
    console.log(selectedtea);
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
  <Nav.Link href="#action2" style ={{color: 'white'}}>My Teas</Nav.Link>
  return (
  <div className = 'my-3'>
    <div className="teaCard d-flex py-1 px-2">
      <div className="col-3 d-flex justify-content-center align-items-center">
        <img className = 'teaCardImg' src={props.img} alt="" />
      </div>
      <div className="col-7">
        <div className="mr-2">
          <div className="cardTitle my-0 py-0"> 
            <Nav.Link href={`/teaPage/${props.id}}`} style ={{color: 'black'}}>{props.name}</Nav.Link>
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
        {/* Tea Rating: <FaStar/><FaStar/><FaStar/><FaStar/>(4.6) | <span>200 ratings</span> */}
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
      <div className = ' d-flex justify-content-center align-items-start py-1'>
        <div className = 'border-top border-bottom border-right px-3 py-1'>
          Rating: <FaStar/><FaStar/><FaStar/><FaStar/>
        </div>
        <div className = 'border px-3 py-1'>
          Average Rating: 4.6 
        </div>
        <div className = 'border px-3 py-1'>
          Total Ratings: 200
        </div>
        <div className = 'border-top border-bottom border-left px-3 py-1'>
          Date Added: 10/22/23
        </div>
      </div>
    </div>
  );
};

export default TeaCard;
