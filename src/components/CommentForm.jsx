import React, {useState} from 'react';
import { ListContext } from '../App';
import { useContext } from 'react';
import CommentCard from './CommentCard';
import { useParams } from 'react-router-dom';

const CommentForm = () => {
  const { isDarkMode, selectedTea, setSelectedTea, userProfile } = useContext(ListContext);
  const [comment, setComment] = useState("")
  const { id } = useParams()

  const commentChange = (e) => {
    setComment(e.target.value)
  }

  const submitComment = async (e) => {
    e.preventDefault()
    setComment("")
    const url = `http://localhost:5100/teas/${id}/comments`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
       'content-type': 'application/json',
      },
      body: JSON.stringify({
       "userID": userProfile._id, 
       "content": comment
      })
    })

   const data = await res.json();
   const teaInfo = {...selectedTea, comments: data}
   setSelectedTea(teaInfo)
  }

  return (
    <>
    <div className="d-flex m-2 p-2 comment_container flex-column border" style = {isDarkMode? {}: {background: 'rgb(51,51,51)', color: 'white'}}>
      {selectedTea.comments ?
        selectedTea.comments.map(comment => <CommentCard key={comment._id} comment={comment} />)
        : "No Comments Yet"
      }
    </div>
    <form className = 'w-75 text-center' onSubmit={submitComment}>
      <div className="form-group d-flex py-2 align-items-center">
        <textarea className="form-control" rows="1" id="comment" value={comment} onChange={commentChange} style = {isDarkMode? {}: {background: 'rgb(38, 38, 38)', color: 'white'}}></textarea>
      </div>
          <input type="submit" value="Comment" className = 'btn btn-success mt-2 mb-3 w-50'
                  style = {{marginLeft: '2em'}} />
    </form>
    </>
  )
}

export default CommentForm