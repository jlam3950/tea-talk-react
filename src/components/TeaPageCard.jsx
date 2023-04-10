import React from "react";
import { FaStar, FaPlus } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AddTeaModal from './AddTeaModal';

// need to create get request

const TeaCard = () => {
    const [tea, setTea] = useState([])
    const { id } = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [selectedtea, setselectedtea] = useState({});  
    const { refreshTeaList, userProfile } = useContext(ListContext);  

    const openModal = () => {
      setTea({...tea, id: tea._id });
      console.log(tea);
      refreshTeaList(userProfile._id)
      setModalShow(true);
    }
    
    const getTea = async () => { 
        const url = "http://localhost:5100/teas/" + id.slice(0,24);        
        const res = await fetch(url);
        const data = await res.json();
        setTea(data);
      }
    
    useEffect(() => {
        getTea() 
    }, []);

  return (
    <div className = 'd-flex flex-column'>
    <div className="d-flex my-3 py-2 px-2">
      <div className="col-4 d-flex justify-content-center align-items-center">
        <img className = 'm-2 mb-5' style = {{'height': '8.25rem', "width": '8.25rem'}} src={tea ? tea.imageURL : ''} alt="" />
      </div>
      <div className="col-8">
        <div className="mr-2">
          <div className="my-0 py-0" style = {{"fontSize": "1.65em", 'fontWeight': '600'}}> 
            { tea ? tea.name : ''}
          </div>
          <div className="d-flex flex-column">
            <div className="" style = {{"fontSize": "1.25em", 'fontWeight': '500'}} onClick = {() => console.log(tea)}>
              { tea ? tea.brand : ''} <span className = 'mx-5'> { tea ? tea.type : ''} </span>
            </div>
            {/* <div className="mx-4" style = {{"fontSize": "1.25em"}}>
            { tea ? tea.type : ''}
            </div> */}
          </div>
          <div className="">
          {/* add rating when added to database */}
            {/* {props.rating} */}
          </div>
          <div className="" style = {{"fontSize": "1.15em"}}>
            "Black tea is a kind of tea made from leaves of Camellia sinensis. Often, it is stronger in taste than other varieties of tea, like green tea or oolong."
          </div>
        </div>
        <div style = {{"fontSize": "1.15em", 'fontWeight': '500'}}>
            Tea Rating: <FaStar/><FaStar/><FaStar/><FaStar/>(4.6) | <span>200 ratings</span>
        </div>
        <div className = 'my-4'>
            <button className = 'btn btn-primary w-50' onClick={() => openModal()}><FaPlus className ='mb-1'/> Add Tea</button>
                <AddTeaModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                selectedtea = {tea}
                /> 
        </div>
      </div>
    </div>
        <div className = 'd-flex justify-content-center' style ={{"fontSize": "1.15em", 'fontWeight': 'bold'}}>
            { tea ? 'Comments' : ''}
        </div>
    </div>
  );
};

export default TeaCard;
