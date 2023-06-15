import React from "react";
import { FaStar, FaPlus } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AddTeaModal from './AddTeaModal';
import { TeaRating } from "./TeaRating";

// need to create get request

const TeaPageCard = () => {
    const { refreshTeaList, userProfile, setAlertFlag, setAlertInfo, isDarkMode, selectedTea } = useContext(ListContext);
    const [tea, setTea] = useState(selectedTea)
    const { id } = useParams();
    const [modalShow, setModalShow] = useState(false);  

    const openModal = () => {
      setTea({...tea, id: tea._id });
      console.log(tea);
      refreshTeaList(userProfile._id)
      setModalShow(true);
    }

    const signInToSave = () => {
      setAlertFlag(true);
      setAlertInfo('Please Sign In...');
      setTimeout(() => {
        setAlertFlag(false);
        setAlertInfo('');
      }, 2000)
    }

  return (
    <div className = 'd-flex flex-column' style = {isDarkMode? {}: {backgroundColor: 'rgb(51,51,51)', color: 'white', border: 'black'}}>
      {/* <div className="d-flex justify-content-center mt-2">
        <img className = 'my-2 mb-1 teaPageImg' style = {{'height': '15rem', "width": '50%', "border-radius": "5px"}} src={selectedTea ? selectedTea.imageURL : ''} alt="" />
      </div> */}
    <div className="tea-page-container d-flex my-3 mx-3 py-2 px-2">
      <div className="col-sm-12">
        <div className="mr-2">
          <div className="my-0 py-0 d-flex justify-content-center" style = {{"fontSize": "2em", 'fontWeight': '500'}}> 
            { selectedTea ? selectedTea.name : ''}
          </div>
          <div className="">
            <div className="d-flex justify-content-center" style = {{"fontSize": "1.25em", 'fontWeight': '500'}}>
              { selectedTea ? selectedTea.brand : ''} <span className = ''> { tea ? tea.type : ''} </span>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <img className = 'my-2 mb-4 teaPageImg' style = {{'height': '15rem', "width": '45%', "border-radius": "5px"}} src={selectedTea ? selectedTea.imageURL : ''} alt="" />
            </div>
          </div>
          <div className="">
          </div>
          <div className="mb-3 mx-2" style = {{"fontSize": "1.15em"}}>
            {selectedTea ? selectedTea.description : ""}
          </div>
        </div>
        <div className="ratingBar" style = {{"fontSize": ".696em", "lineHeight": "1.7em"}}>
            <TeaRating tea={selectedTea}/>
        </div>
        <div className = 'my-4'>
          { userProfile.username ? 
          <div className = 'd-flex justify-content-center'>
            <button className = 'btn btn-primary' style = {{"width": "60%", marginRight: '1em'}} onClick={() => openModal()}> Save Tea</button>
                <AddTeaModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                selectedtea = {selectedTea}
                /> 
          </div>
            :  
            <>
            <button className = 'btn btn-danger' style = {{"width": "60%"}} onClick={() => signInToSave()}> Sign In To Save Tea...</button>
            </>
          }
        </div>
      </div>
      
    </div>
        <div className = 'd-flex justify-content-center' style ={{"fontSize": "1.15em", 'fontWeight': 'bold'}}>
            { selectedTea ? 'Comments' : ''}
        </div>
    </div>
  );
};

export default TeaPageCard;
