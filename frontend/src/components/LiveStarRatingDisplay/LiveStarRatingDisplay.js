import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LiveStarRatingDisplay({ restaurant, number }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [rating, setRating] = useState(0);
	const [currentVal, setCurrentVal] = useState(0);
	const [ratingPhrase, setRatingPhrase] = useState('Select your rating');

	let star1;
	let star2;
	let star3;
	let star4;
	let star5;

	// Select stars from DOM
	star1 = document.querySelector(`.star-one${number}`);
	star2 = document.querySelector(`.star-two${number}`);
	star3 = document.querySelector(`.star-three${number}`);
	star4 = document.querySelector(`.star-four${number}`);
	star5 = document.querySelector(`.star-five${number}`);

	const handleSubmit = () => {};

	// Conditionally remove stars
	const removeStars = (num, number) => {
		let star1;
		let star2;
		let star3;
		let star4;
		let star5;

		// Find what the classList of each star is
		star1 = document.querySelector(`.star-one${number}`);
		let star1CL = document.querySelector(`star-one${number}`)?.getAttribute('class');
		let star1Arr = star1CL?.split(' ');

		star2 = document.querySelector(`.star-two${number}`);
		let star2CL = document.querySelector(`.star-two${number}`)?.getAttribute('class');
		let star2Arr = star2CL?.split(' ');

		star3 = document.querySelector(`.star-three${number}`);
		let star3CL = document.querySelector(`.star-three${number}`)?.getAttribute('class');
		let star3Arr = star3CL?.split(' ');

		star4 = document.querySelector(`.star-four${number}`);
		let star4CL = document.querySelector(`.star-four${number}`)?.getAttribute('class');
		let star4Arr = star4CL?.split(' ');

		star5 = document.querySelector(`.star-five${number}`);
		let star5CL = document.querySelector(`.star-five${number}`)?.getAttribute('class');
		let star5Arr = star5CL?.split(' ');

		// Remove class if it's not equal to base
		star1Arr?.forEach((each) => {
			if (!(each === `star-one${number}`)) {
				star1?.classList?.remove(`${each}`);
			}
		});
		star1?.classList?.add('zero-star');

		star2Arr?.forEach((each) => {
			if (!(each === `star-two${number}`)) {
				star2?.classList?.remove(`${each}`);
			}
		});
		star2?.classList?.add('zero-star');

		star3Arr?.forEach((each) => {
			if (!(each === `star-three${number}`)) {
				star3?.classList?.remove(`${each}`);
			}
		});
		star3?.classList?.add('zero-star');

		star4Arr?.forEach((each) => {
			if (!(each === `star-four${number}`)) {
				star4?.classList?.remove(`${each}`);
			}
		});
		star4?.classList?.add('zero-star');

		star5Arr?.forEach((each) => {
			if (!(each === `star-five${number}`)) {
				star5?.classList?.remove(`${each}`);
			}
		});
		star5?.classList?.add('zero-star');

		setRatingPhrase('Select your rating');
	};

	// Render Stars upon mouse hover
	const addStars = (num, number) => {
		removeStars();
    console.log(num)
    console.log(number)
		switch (num) {
			case 1:
				star1?.classList?.remove('zero-star');
				star1?.classList?.add(`starz-one${number}`);
				setCurrentVal(1);
				setRatingPhrase('Not good');
				break;
			case 2:
				star1?.classList?.remove('zero-star');
				star2?.classList?.remove('zero-star');
				star1?.classList?.add(`starz-two${number}`);
				star2?.classList?.add(`starz-two${number}`);
				setCurrentVal(2);
				setRatingPhrase("Could've been better");
				break;
			case 3:
				star1?.classList?.remove('zero-star');
				star2?.classList?.remove('zero-star');
				star3?.classList?.remove('zero-star');
				star1?.classList?.add(`starz-three${number}`);
				star2?.classList?.add(`starz-three${number}`);
				star3?.classList?.add(`starz-three${number}`);
				setCurrentVal(3);
				setRatingPhrase('OK');
				break;
			case 4:
				star1?.classList?.remove('zero-star');
				star2?.classList?.remove('zero-star');
				star3?.classList?.remove('zero-star');
				star4?.classList?.remove('zero-star');
				star1?.classList?.add(`starz-four${number}`);
				star2?.classList?.add(`starz-four${number}`);
				star3?.classList?.add(`starz-four${number}`);
				star4?.classList?.add(`starz-four${number}`);
				setCurrentVal(4);
				setRatingPhrase('Good');
				break;
			case 5:
				star1?.classList?.remove('zero-star');
				star2?.classList?.remove('zero-star');
				star3?.classList?.remove('zero-star');
				star4?.classList?.remove('zero-star');
				star5?.classList?.remove('zero-star');
				star1?.classList?.add(`starz-five${number}`);
				star2?.classList?.add(`starz-five${number}`);
				star3?.classList?.add(`starz-five${number}`);
				star4?.classList?.add(`starz-five${number}`);
				star5?.classList?.add(`starz-five${number}`);
				setCurrentVal(5);
				setRatingPhrase('Great');
				break;
		}
	};

	const handleStars = (e, num) => {
		e.preventDefault();

		switch (num) {
			case 1:
				setRating(1);
				addStars(1);
				// addStars(1);
				break;
			case 2:
				setRating(2);
				addStars(2);
				// addStars(2);
				break;
			case 3:
				setRating(3);
				addStars(3);
				// addStars(3);
				break;
			case 4:
				setRating(4);
				addStars(4);
				// addStars(4);
				break;
			case 5:
				setRating(5);
				addStars(5);
				// addStars(5);
				break;
		}
	};

	return (
		<div className='stars_container'>
			<div className='star-rating' onMouseOut={() => addStars(rating, 0)}>
				<div
					type='radio'
					name='star-container'
					className='star-container'
					id='s1'
					onClick={(e) => handleStars(e, 1)}
					onMouseEnter={() => addStars(1, number)}>
					<span className={`star-one${number} zero-star`}>★</span>
				</div>
				<div
					type='radio'
					name='star-container'
					className='star-container'
					id='s2'
					onClick={(e) => handleStars(e, 2)}
					onMouseEnter={() => addStars(2, number)}>
					<span className={`star-two${number} zero-star`}>★</span>
				</div>
				<div
					type='radio'
					name='star-container'
					className='star-container'
					id='s3'
					onClick={(e) => handleStars(e, 3)}
					onMouseEnter={() => addStars(3, number)}>
					<span className={`star-three${number} zero-star`}>★</span>
				</div>
				<div
					type='radio'
					name='star-container'
					className='star-container'
					id='s4'
					onClick={(e) => handleStars(e, 4)}
					onMouseEnter={() => addStars(4, number)}>
					<span className={`star-four${number} zero-star`}>★</span>
				</div>
				<div
					type='radio'
					name='star-container'
					className='star-container'
					id='s5'
					onClick={(e) => handleStars(e, 5)}
					onMouseEnter={() => addStars(5, number)}>
					<span className={`star-five${number} zero-star`}>★</span>
				</div>
			</div>
			{/* <div className='rating-phrase-container'>
				<p>{ratingPhrase}</p>
			</div> */}
		</div>
	);
}

export default LiveStarRatingDisplay;
