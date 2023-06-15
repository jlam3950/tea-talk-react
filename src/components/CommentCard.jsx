import React from "react";
import { ListContext } from "../App";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

const CommentCard = (props) => {
  const { comment } = props;
  const { userProfile, selectedTea, setSelectedTea, isDarkMode, renderDelete } =
    useContext(ListContext);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(true);


  const deleteComment = async () => {
    const url = `http://localhost:5100/teas/${id}/comments/${comment._id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    const teaInfo = { ...selectedTea, comments: data };
    setSelectedTea(teaInfo);
  };

  return (
    <div
      className = { comment.user._id === userProfile._id ? '' : 'm-1 mb-0 d-flex justify-content-start' }
      style={
        isDarkMode
          ? {}
          : { background: "", color: "white", border: "none" }
      }
    >
      <img src={comment.user.imageURL} alt="" />
      <div className =''>
        <div className="d-flex justify-content-end mx-2">
          <h6 className={ comment.user._id === userProfile._id ? "commentCard sb2" : "commentCard sb3"}>"{comment.content}"</h6>
        </div>
        <div className={comment.user._id === userProfile._id ? "d-flex justify-content-end author_div" : 'd-flex justify-content-start author_div'}>
          <div className="d-flex">
          {/* <div className="d-flex flex-column"> */}
          <div className = {renderDelete ? '' : 'd-none'}>
            <div className="my-1 d-flex justify-content-end">
              {comment.user._id === userProfile._id && (
                <button
                  onClick={deleteComment}
                  className="btn btn-danger btn-sm"
                  style = {{'fontSize': '.8em'}}
                >
                  Delete
                </button>
              )}
            </div>
                </div>
            <div>
                <div className="d-flex justify-content-start mx-3">
                {comment.user.username}{" "}
                </div>
                <div className="comment_date d-flex justify-content-end mx-3">
                    {comment.date.slice(5, 10)}-{comment.date.slice(2, 4)}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
