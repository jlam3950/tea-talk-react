import React from 'react';
import { ListContext } from '../App';
import { useContext } from 'react';
import CommentCard from './CommentCard';

const CommentForm = () => {
  const { isDarkMode, selectedTea } = useContext(ListContext);  

  return (
    <>
    <div className="d-flex m-2 p-2 comment_container flex-column border" style = {isDarkMode? {}: {background: 'rgb(51,51,51)', color: 'white'}}>
      {selectedTea.comments ?
        selectedTea.comments.map(comment => <CommentCard key={comment._id} comment={comment} />)
        : "No Comments Yet"
      }
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