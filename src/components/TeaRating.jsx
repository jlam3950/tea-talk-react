import React, { useState, useContext } from 'react'
import { ListContext } from '../App';
import { Rating } from 'react-simple-star-rating'

export const TeaRating = (props) => {
  const {userProfile, setUserProfile} = useContext(ListContext)
  const { tea } = props
  const [teaRating, setTeaRating] = useState(tea.rating)
  const [averageTeaRating, setAverageTeaRating] = useState((tea.ratingsTotal/tea.numberOfRatings)||0)
  const [totalTeaRatings, setTotalTeaRatings] = useState(tea.numberOfRatings)
  const [ratingFillColor, setRatingFillColor] = useState(tea.ratingColor)


  const onPointerEnter = () => {
    if (ratingFillColor === "#000002"){
      setRatingFillColor("#ffd300")
    }
  }
    
  const onPointerLeave = () => {
    if (userProfile.username == null || userProfile.ratedTeas[tea._id] == null){
      setRatingFillColor("#000002")
    }
  }
    
  const handleRating = async (rating) => {
    setRatingFillColor("#ffd300")
    const userID = userProfile._id;
    const teaID = tea._id 
    const url = `http://localhost:5100/users/${userID}/ratings`; 
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        "tea": teaID,
        "rating": rating
      })
    })
    const data = await res.json()
    console.log(data)
    setAverageTeaRating(data.ratingsTotal/data.numberOfRatings)
    setTotalTeaRatings(data.numberOfRatings)
    const newProfile = {
      ...userProfile,
      ratedTeas:{...(userProfile.ratedTeas), [teaID]: rating}
    }
    setUserProfile(newProfile)
  }

  return (
    <div className = 'tea-rating d-flex justify-content-center align-items-start py-1'>
      <div className = 'tea-rating-container border-top border-bottom border-right rating_div'>
        Rating: <Rating
                  allowFraction={true}
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  SVGstyle={{width: "23px", height: "23px"}}
                  initialValue={teaRating}
                  fillColor={ratingFillColor}
                  readonly={userProfile.username ? false : true}
                />
      </div>
      <div className = 'border px-3 py-1'>
        Average Rating: {averageTeaRating.toFixed(1)} 
      </div>
      <div className = 'border-top border-bottom px-3 py-1'>
        Total Ratings:  {totalTeaRatings}
      </div>
    </div>
  )
}
