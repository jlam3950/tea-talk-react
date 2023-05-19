import React from 'react'

const CommentCard = (props) => {
    const {comment} = props


  return (
    <div>
        <img src={comment.user.imageURL} alt="" />
        <div>
            <h3>{comment.user.username}</h3>
            <p>{comment.content}</p>
            <p>{comment.date}</p>
        </div>
    </div>
  )
}

export default CommentCard