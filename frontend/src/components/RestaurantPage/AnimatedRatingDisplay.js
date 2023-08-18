import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedRatingDisplay({ reviews }) {
	const positionRef = useRef(null);
	const ratingsBarRef1 = useRef(null);
	const ratingsBarRef2 = useRef(null);
	const ratingsBarRef3 = useRef(null);
	const ratingsBarRef4 = useRef(null);
	const ratingsBarRef5 = useRef(null);

	let rating1, rating2, rating3, rating4, rating5, showRatings, hideRatings;
	let maxVal = -Infinity;
	const ratingObj = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	};
	const refArr = [
		ratingsBarRef5,
		ratingsBarRef4,
		ratingsBarRef3,
		ratingsBarRef2,
		ratingsBarRef1,
	];

	// Use ratingObj to track how many reviews for each rating
	const calculatePercentage = (reviews) => {
		if (reviews) {
			reviews.forEach((review) => {
				// find quanity of each rating
				ratingObj[review.rating] += 1;
			});

			for (let rating in ratingObj) {
				// Change values in ratingsObj to percentage
				const amount = ratingObj[rating];
				const percentage = Math.floor((amount / reviews.length) * 100);
				ratingObj[rating] = percentage;
				maxVal = percentage === 0 ? 0 : Math.max(maxVal, percentage); // Find and set max percentage
			}

			rating1 = ratingObj['1'];
			rating2 = ratingObj['2'];
			rating3 = ratingObj['3'];
			rating4 = ratingObj['4'];
			rating5 = ratingObj['5'];
		}
	};
	calculatePercentage(reviews);

	useEffect(() => {
		showRatings = () => {
			refArr.forEach((ref) => {
				const val = parseFloat(ref.current.getAttribute('data-value'));
				const durationForBar = ( val/maxVal ) * 2000
				// console.log(ref.current.id, ' == duration == ', durationForBar, ' max === ', maxVal, ' val=== ', val)
				ref.current.style.opacity = val === 0 ? 0 : '1';
				ref.current.style.transitionDuration = `${
					durationForBar === Infinity ? 0 : durationForBar
				}ms`;
				ref.current.style.width = `${val}%`;
			});
		};

		hideRatings = () => {
			refArr.forEach((ref) => {
				ref.current.style.opacity = 0;
				ref.current.style.width = 0;
			});
		};

		window.addEventListener('scroll', () => {
			const sectionPos = positionRef.current
				? positionRef.current.getBoundingClientRect().top
				: null;
			const screenPos = window.innerHeight;

			if (sectionPos !== null) {
				if (sectionPos < screenPos) {
					showRatings();
				} else {
					hideRatings();
				}
			}
			return () => window.removeEventListener('scroll', () => {});
		});
	});

	return (
		<>
			<div className='animated-bar-container' ref={positionRef}>
				<div
					className='animated-bar'
					id='animated-bar5'
					data-value={rating5}
					ref={ratingsBarRef5}></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar4'
					data-value={rating4}
					ref={ratingsBarRef4}></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar3'
					data-value={rating3}
					ref={ratingsBarRef3}></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar2'
					data-value={rating2}
					ref={ratingsBarRef2}></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar1'
					data-value={rating1}
					ref={ratingsBarRef1}></div>
			</div>
		</>
	);
}
