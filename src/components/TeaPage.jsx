import React from 'react';
import TeaPageCard from './TeaPageCard';
import CommentForm from './CommentForm';

const TeaPage = () => {

  return (
    <div className = 'container-fluid py-2 d-flex vh-100'>
       <div className="d-flex flex-column">
          <div className ="input-group d-flex flex-row justify-content-center">
          </div>
      <div className ='teaContainer vw-100 my-5'>
          <div className = 'teaCardContainer'> 
            <TeaPageCard /> 
            <CommentForm />
          </div>
      </div>
      </div>
    </div>
  )
}

export default TeaPage