import React from "react";
import { FaPlus } from 'react-icons/fa';

const TeaCard = (props) => {

  return (
    <div className="teaCard d-flex border my-3 py-4 mx-2 px-4">
      <div className="col-4 d-flex justify-content-center align-items-center">
        <img className = 'teaCardImg' src={props.img} alt="" />
      </div>
      <div className="col-6 border">
        <div className="mr-2">
          <div className="border"> 
            {props.name}
          </div>
          <div className="d-flex">
            <div className="col-6">
              {props.brand}
            </div>
            <div className="col-6">
              {props.type}
            </div>
          </div>
          <div className="border">
            {props.rating}
          </div>
        </div>
      </div>
      <div className="teaPlus col-2 border d-flex justify-content-center align-items-center">
        <FaPlus onClick = {(e) => console.log(props)}/>
        {/* need to pass this back up to the parent to store in array */}
      </div>
    </div>
  );
};

export default TeaCard;
