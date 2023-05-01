import React from 'react';
import { ListContext } from '../App';
import { useContext } from 'react';

const CommentForm = () => {
  const { isDarkMode } = useContext(ListContext);  

  return (
    <>
    <div className="d-flex m-2 p-2 comment_container flex-column border" style = {isDarkMode? {}: {background: 'rgb(51,51,51)', color: 'white'}}>
      <div className = 'p-2'>
        Jan-1-23 Humphrey says : "Yum, great tea"  
      </div>
      <div className = 'p-2'>
        Feb-10-23 Grumpy_Duck says : "DISGUSTING, awful tea!"  
      </div>
    </div>
    <div className = 'w-75 text-center'>
      <div className="form-group d-flex py-2 align-items-center">
        <textarea className="form-control" rows="1" id="comment"></textarea>
      </div>
          <button className = 'btn btn-success mt-2 mb-3 w-50'
                  style = {{marginLeft: '2em'}}>Comment</button>
    </div>
    </>
  )
}

export default CommentForm