import React from 'react';

const CommentForm = () => {
  return (
    <>
    <div className="d-flex justify-content-center m-2 p-2 comment_container" style = {{'height': '20em', 'width': '90%'}}>
        Humphrey says : "Yum, great tea"  ({Date().slice(0,21)})
    </div>
    <div>
        <input className = 'm-3'></input>
        <button className = 'btn btn-success py-1 mb-1'>Comment</button>
    </div>
    </>
  )
}

export default CommentForm