import React from "react";
import { FaPlus } from 'react-icons/fa';
import AddTeaModal from './AddTeaModal';
import { useState } from 'react';

const TeaCard = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const openModal = (teaInfo) => {
    setModalShow(true);
    console.log(teaInfo);
  }

  return (
    <div className="teaCard d-flex my-2 py-3 mx-2 px-4">
      <div className="col-4 d-flex justify-content-center align-items-center">
        {/* <img className = 'teaCardImg' src={props.img} alt="" /> */}
        {/* will update ^ teas once images are loaded in db */}
        <img className = 'teaCardImg' src='/images/doubleSpiceChai.png' alt="" />
      </div>
      <div className="col-6">
        <div className="mr-2">
          <div className="cardTitle my-0 py-0"> 
            {props.name}
          </div>
          <div className="d-flex cardSubtitleAndType">
            <div className="col-6">
              {props.brand}
            </div>
            <div className="col-6">
              {props.type}
            </div>
          </div>
          <div className="">
            {props.rating}
          </div>
          <div className="">
            "Black tea is a kind of tea made from leaves of Camellia sinensis. Often, it is stronger in taste than other varieties of tea, like green tea or oolong."
          </div>
        </div>
      </div>
      <div className="teaPlus col-2 d-flex justify-content-center align-items-center">
        <FaPlus onClick = {() => openModal(props)}/>
        <AddTeaModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
        {/* need to pass this back up to the parent to store in array */}
      </div>
    </div>
  );
};

export default TeaCard;
