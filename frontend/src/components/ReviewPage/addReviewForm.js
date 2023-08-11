import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { newReview, getAllRevs } from '../../store/reviews';
import { oneRestaurant } from '../../store/restaurant';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LiveStarRatingDisplaySingle from '../LiveStarRatingDisplaySingle/LiveStarRatingDisplaySingle';

function AddReviewForm({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id, selectedRating } = useParams();
	const restaurantId = id;
	const [body, setBody] = useState('');
	const [rating, setRating] = useState(0);
	const [currentVal, setCurrentVal] = useState(0);
	const [ratingPhrase, setRatingPhrase] = useState('Select your rating');

	const userId = user.id;
	const currentRestaurant = useSelector((state) => state.restaurant);


	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(oneRestaurant(id));
	}, [dispatch]);

	const saveRating = (val) => {
		setRating(val)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const reviewPayload = {
			body,
			restaurantId,
			rating,
		};

		if (!rating > 0 && !body)
			return alert('Please complete the form before submitting.');
		if (!rating > 0)
			return alert('Please leave a rating before posting your review.');
		if (!body) return alert('Review requires a body.');

		if (rating > 0 && body) {
			await dispatch(newReview(reviewPayload, userId));
			await dispatch(getAllRevs(restaurantId));
			history.push(`/restaurants/${id}`);
		};
	};

	// live update for textbody
	const updateBody = (e) => setBody(e.target.value);

	return (
		<div className='review-container-main'>
			<div className='review-upper'>
				<h1>
					{currentRestaurant && Object.values(currentRestaurant)[0]?.name}
				</h1>
			</div>
			<form className='review-form' onSubmit={handleSubmit}>
				<div className='stars_container'>
					<LiveStarRatingDisplaySingle saveRating={saveRating} selectedRating={selectedRating}/>
				</div>
				<div className='textarea-container'>
					<textarea
						className='review_body'
						value={body}
						onChange={updateBody}
						placeholder="Doesn't look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the hamburger and wow…  there are no words. A burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There's about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can't go wrong. Not much else to say besides go see for yourself! You won't be disappointed."></textarea>
				</div>
				<div className='post-button-container'>
					<button className='post-button' onClick={(e) => handleSubmit(e)}type='button'>
						Post Review
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddReviewForm;
