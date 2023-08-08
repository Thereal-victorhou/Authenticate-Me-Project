import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { oneReview, getAllRevs, deleteOneReview } from '../../store/reviews';
import { starRatingSmall } from '../Utils/DisplayStarRating';
import FunctionalButtonModal from './FunctionalButtonModal';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


function RecommendedReviews({ user }) {
  const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

  const restaurantReviews = useSelector((state) => Object.values(state.review));

  	// Handle Button
	const handleButton = async (e, reviewId) => {
		e.preventDefault();

		switch (e.target.getAttribute('id')) {
			case 'edit':
				await dispatch(oneReview(reviewId));
				history.push(`/edit/review/${reviewId}`);

				break;
			case 'delete':
				// setCounter(prev => prev + 1)
				dispatch(deleteOneReview(reviewId));
				window.scrollTo(0, 0);
				break;
		}
	};

  return (
    <>
      {restaurantReviews.length ? (
        restaurantReviews.map((review) => (
          <li className='review-card-main' key={review.body}>
            <div className='review-card'>
              <div className='review-card-upper'>
                <span id='user-avatar'>
                  <img src={`${review.imgSrc}`} lazyLoading={true} alt='Profile Picture'/>
                </span>
                <div id={`user-name`}>
                  <h4>{review.username}</h4>
                  <h4>zip: {review.zipCode}</h4>
                </div>
                <div></div>
              </div>
              <div className='review-card-lower'>
                {starRatingSmall(review.rating)}
                <div className='review-card-container' id={`${review.id}-review-card-container`}>
                  <h3 id={`${review.id}-body`}>{review.body}</h3>
                </div>
              </div>
            </div>
            <div className='functional-buttons-modal-container'>
              <FunctionalButtonModal user={user} review={review} />
            </div>
          </li>
        ))
      ) : (
        <h2>Be the first to review!</h2>
      )}
    </>
  )


}

export default RecommendedReviews;
