import React from "react";
import { FaPlus } from 'react-icons/fa';

const TeaCard = () => {
  return (
    <div className="teaCard d-flex border my-3 py-4 mx-2 px-4">
      <div className="col-4 d-flex justify-content-center align-items-center">
        <img className = 'teaCardImg' src="/images/doubleSpiceChai.png" alt="" />
      </div>
      <div className="col-6 border">
        <div className="mr-2">
          <div className="border"> 
            Tea Name 
          </div>
          <div className="d-flex">
            <div className="col-6">
              Brand
            </div>
            <div className="col-6">
              Type
            </div>
          </div>
          <div className="border">
            Rating
          </div>
        </div>
      </div>
      <div className="teaPlus col-2 border d-flex justify-content-center align-items-center">
        <FaPlus />
      </div>
    </div>
  );
};

export default TeaCard;
