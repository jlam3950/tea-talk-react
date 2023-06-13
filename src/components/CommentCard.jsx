import React from 'react'
import { ListContext } from '../App';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

const CommentCard = (props) => {
    const {comment} = props
    const { userProfile, selectedTea, setSelectedTea, isDarkMode } = useContext(ListContext);
    const { id } = useParams()

    const deleteComment = async () => {
        const url = `http://localhost:5100/teas/${id}/comments/${comment._id}`;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            }
        })
        const data = await res.json();
        const teaInfo = {...selectedTea, comments: data}
        setSelectedTea(teaInfo)
    }


  return (
    <div className='commentCard mx-1' style = {isDarkMode? {}: {background: 'rgb(66, 51, 22)', color: 'white'}}>
        <img src={comment.user.imageURL} alt="" />
        <div>
            <h6>"{comment.content}"</h6>
            <div className = 'd-flex justify-content-end author_div'> 
                <div className="d-flex flex-column">
                    <div className='d-flex justify-content-end'>
                        - {comment.user.username}
                    </div>
                    <div className = 'comment_date'>
                        {comment.date.slice(0,10)}
                    </div>
                    <div className = 'my-1 d-flex justify-content-end'>
                        {comment.user._id === userProfile._id && <button onClick = {deleteComment} className= 'btn btn-danger btn-sm'>Delete</button>}
                    </div>
                </div>
                
            </div>  
        </div>
    </div>
  )
}

export default CommentCard