import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editOldReview, getAllRevs } from '../../store/reviews';
import { oneReview } from '../../store/reviews';
import { oneRestaurant } from '../../store/restaurant';
import LiveStarRatingDisplaySingle from '../LiveStarRatingDisplaySingle/LiveStarRatingDisplaySingle';

function EditReviewForm({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();

	const singleReview = useSelector((state) => state?.review[`${id}`]);
	const restaurantId = singleReview?.restaurantId;
	const currentRestaurant = useSelector((state) => state.restaurant);

	const userId = user.id;
	const [body, setBody] = useState('');
	const [rating, setRating] = useState(0);


	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(oneReview(id));
		dispatch(oneRestaurant(restaurantId));
	}, [dispatch, id]);

	useEffect(() => {
		if (singleReview) {
			// console.log(singleReview)
			setBody(singleReview.body);
			setRating(singleReview.rating);
		}
	}, [singleReview]);

	const saveRating = (val) => {
		setRating(val)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('inside handle submit')
		const reviewPayload = {
			body,
			userId,
			restaurantId,
			rating,
			reviewId: id,
		};

		if (!rating > 0 && !body)
			return alert('Please complete the form before submitting.');
		if (!rating > 0)
			return alert('Please leave a rating before posting your review.');
		if (!body) return alert('Review requires a body.');

		if (rating > 0 && body) {
			await dispatch(editOldReview(reviewPayload));
			await dispatch(getAllRevs(restaurantId))
			history.push(`/restaurants/${restaurantId}`);
		}
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
			<form className='review-form'>
				<div className='stars_container'>
					<LiveStarRatingDisplaySingle saveRating={saveRating} selectedRating={singleReview?.rating}/>
				</div>
				<div className='textarea-container'>
					<textarea
						className='review_body'
						value={body}
						onChange={updateBody}
						placeholder="Doesn't look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the impossible hamburger and wow…  there are no words. A vegetarian burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There's about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can't go wrong. Not much else to say besides go see for yourself! You won't be disappointed."></textarea>
				</div>
				<div className='post-button-container'>
					<button className='post-button' type='button' onClick={(e) => handleSubmit(e)}>
						Edit Review
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditReviewForm;
