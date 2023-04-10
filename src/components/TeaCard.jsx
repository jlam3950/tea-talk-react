import React from "react";
import AddTeaModal from './AddTeaModal';
import { FaPlusSquare, FaStar } from 'react-icons/fa';
import { ListContext } from '../App';
import { useContext, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const TeaCard = (props) => {
  const { refreshTeaList, userProfile, setUserProfile, setAlertFlag, setAlertInfo } = useContext(ListContext);
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

  const handleRating = async (rating) => {
    console.log(`(From Frontend) Rated ${props.brand} ${props.name} ${rating} Stars`)
    const userID = userProfile._id;
    const teaID = props.id 
    const url = `http://localhost:5100/users/${userID}/ratings`; 
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
       'content-type': 'application/json',
      },
      body: JSON.stringify({
       "tea": props.id,
       "rating": rating
      })
    })
    const data = await res.json()
    const newProfile = {
      ...userProfile,
      ratedTeas:{...(userProfile.ratedTeas), [teaID]: rating}
    }
    setUserProfile(newProfile)
    console.log("New Profile:\n", newProfile)
    console.log(data)
  }

  const checkRating = () => {
    if (props.id in userProfile.ratedTeas){
      return userProfile.ratedTeas[props.id]
    } else {
      return 0
    }
  }


  return (
    <div className="teaCard d-flex my-3 py-2 px-2">
      <div className="col-3 d-flex justify-content-center align-items-center">
        <img className = 'teaCardImg' src={props.img} alt="" />
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
        Tea Rating: <Rating 
                      allowFraction={true}
                      onClick={handleRating}
                      initialValue={props.rating}
                      fillColor="#000000"
                    />
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
