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
    const { refreshTeaList, userProfile, setAlertFlag, setAlertInfo } = useContext(ListContext);  

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

    const signInToSave = () => {
      setAlertFlag(true);
      setAlertInfo('Please Sign In...');
      setTimeout(() => {
        setAlertFlag(false);
        setAlertInfo('');
      }, 2000)
    }

  return (
    <div className = 'd-flex flex-column'>
    <div className="tea-page-container d-flex my-3 py-2 px-2">
   {/* changed from col-4 to col-sm-4 */}
      <div className="col-sm-4 d-flex justify-content-center align-items-center">
        <img className = 'm-2 mb-5 teaPageImg' style = {{'height': '8.25rem', "width": '8.25rem'}} src={tea ? tea.imageURL : ''} alt="" />
      </div>
      {/* changed from col-4 to col-sm-8 */}
      <div className="col-sm-8">
        <div className="mr-2">
          <div className="my-0 py-0" style = {{"fontSize": "1.65em", 'fontWeight': '500'}}> 
            { tea ? tea.name : ''}
          </div>
          <div className="d-flex flex-column">
            <div className="" style = {{"fontSize": "1.25em", 'fontWeight': '500'}} onClick = {() => console.log(tea)}>
              { tea ? tea.brand : ''} <span className = 'mx-5'> { tea ? tea.type : ''} </span>
            </div>
          </div>
          <div className="">
          </div>
          <div className="" style = {{"fontSize": "1.15em"}}>
            "Black tea is a kind of tea made from leaves of Camellia sinensis. Often, it is stronger in taste than other varieties of tea, like green tea or oolong."
          </div>
        </div>
        <div style = {{"fontSize": "1.15em", 'fontWeight': '500'}}>
            Tea Rating: <FaStar/><FaStar/><FaStar/><FaStar/>(4.6) | <span>200 ratings</span>
        </div>
        <div className = 'my-4'>
          { userProfile.username ? 
          <>
            <button className = 'btn btn-primary' style = {{"width": "90%"}} onClick={() => openModal()}> Save Tea</button>
                <AddTeaModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                selectedtea = {tea}
                /> 
          </>
            :  
            <>
            <button className = 'btn btn-danger' style = {{"width": "90%"}} onClick={() => signInToSave()}> Sign In To Save Tea...</button>
            </>
          }
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
