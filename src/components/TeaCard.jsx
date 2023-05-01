import React from "react";
import AddTeaModal from './AddTeaModal';
import { FaPlusSquare, FaStar } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { TeaRating } from "./TeaRating";

const TeaCard = (props) => {
  const { refreshTeaList, userProfile, setAlertFlag, setAlertInfo, isDarkMode } = useContext(ListContext);
  const { tea } = props
  const [modalShow, setModalShow] = useState(false);
  const [selectedtea, setselectedtea] = useState({});

  const openModal = (props) => {
    console.log(selectedtea);
    refreshTeaList(userProfile._id)
    setModalShow(true);
    setselectedtea(tea);
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
    <div className="my-3">
      <div className="teaCard d-flex py-1 px-2">
        <div className="col-3 d-flex justify-content-center align-items-center">
          <img className = 'teaCardImg' src={tea.imageURL} alt="" />
        </div>
        <div className="col-7">
          <div className="mr-2">
            <div className="cardTitle my-0 py-0"> 
              <Nav.Link href={`/teaPage/${tea._id}`} style = {isDarkMode? {color: 'black'}: {color: 'white'}}>{tea.name}</Nav.Link>
            </div>
            <div className="d-flex cardSubtitleAndType">
              <div className=" cardSubtitle col-4">
                {tea.brand}
              </div>
              <div className="cardSubtitle col-2">
                {tea.type}
              </div>
            </div>
            <div className="cardDescription">
              "Black tea is a kind of tea made from leaves of Camellia sinensis. Often, it is stronger in taste than other varieties of tea, like green tea or oolong."
            </div>
          </div>
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
      <div className="ratingBar" style = {{"fontSize": ".848em"}}>
      <TeaRating tea={tea}/>
      </div>
    </div>
  );
};

export default TeaCard;
