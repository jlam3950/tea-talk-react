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
    <div className='commentCard' style = {isDarkMode? {}: {background: 'rgb(66, 51, 22)', color: 'white'}}>
        <img src={comment.user.imageURL} alt="" />
        <div>
            <h5>{comment.user.username}</h5>
            <p>{comment.content}</p>
            <span className='commentDate'>{comment.date}</span>
            {comment.user._id === userProfile._id && <button onClick = {deleteComment} className= 'btn btn-danger mx-2'>Delete</button>}
        </div>
    </div>
  )
}

export default CommentCard