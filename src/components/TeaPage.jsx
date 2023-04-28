import React from 'react';
import TeaPageCard from './TeaPageCard';
import CommentForm from './CommentForm';
import { ListContext } from '../App';
import { useContext } from 'react';

const TeaPage = () => {
const { isDarkMode } = useContext(ListContext);  
  
  return (
    <div className = 'container-fluid py-2 d-flex vh-120' style = {isDarkMode? {}: {background: 'black'}}>
       <div className="d-flex flex-column">
          <div className ="input-group d-flex flex-row justify-content-center">
          </div>
      <div className ='teaContainer vw-100 mt-5 mb-5'>
          <div className = 'teaCardContainer-teaPage vh-110' style = {isDarkMode? {}: {background: 'rgb(51,51,51)', border: 'none'}}> 
            <TeaPageCard /> 
            <CommentForm />
          </div>
      </div>
      </div>
    </div>
  )
}

export default TeaPage