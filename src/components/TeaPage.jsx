import React from 'react';
import TeaPageCard from './TeaPageCard';
import CommentForm from './CommentForm';

const TeaPage = () => {

  return (
    <div className = 'container-fluid py-2 d-flex vh-120'>
       <div className="d-flex flex-column">
          <div className ="input-group d-flex flex-row justify-content-center">
          </div>
      <div className ='teaContainer vw-100 mt-5 mb-5'>
          <div className = 'teaCardContainer-teaPage'> 
            <TeaPageCard /> 
            <CommentForm />
          </div>
      </div>
      </div>
    </div>
  )
}

export default TeaPage