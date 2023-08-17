import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedRatingDisplay({ reviews }) {

  const positionRef = useRef(null);
  const ratingsBarRef1 = useRef(null);
  const ratingsBarRef2 = useRef(null);
  const ratingsBarRef3 = useRef(null);
  const ratingsBarRef4 = useRef(null);
  const ratingsBarRef5 = useRef(null);

  let rating1, rating2, rating3, rating4, rating5, showRatings, hideRatings;
	const ratingObj = {
    1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	};


	// Use ratingObj to track how many reviews for each rating
  const calculatePercentage = (reviews) => {
    if (reviews) {
      reviews.forEach((review) => {
        ratingObj[review.rating] += 1;
      });
      console.log('before percent ', ratingObj)
      for (let rating in ratingObj) {
        const amount = ratingObj[rating];
        ratingObj[rating] = Math.floor((amount / reviews.length) * 100);
      }
      console.log('afterPercent === ', ratingObj)

      rating1 = ratingObj['1'];
      rating2 = ratingObj['2'];
      rating3 = ratingObj['3'];
      rating4 = ratingObj['4'];
      rating5 = ratingObj['5'];
    }
  }
  calculatePercentage(reviews)

	useEffect(() => {

		showRatings = () => {
      console.log('show rating === ', ratingObj)
			if (
				!ratingsBarRef5.current &&
				!ratingsBarRef4.current &&
				!ratingsBarRef3.current &&
				!ratingsBarRef2.current &&
				!ratingsBarRef1.current
			)
				return;

			if (
				isNaN(rating5) ||
				isNaN(rating4) ||
				isNaN(rating3) ||
				isNaN(rating2) ||
				isNaN(rating1)
			)
				return;
			ratingsBarRef5.current.style.opacity = rating5 === 0 ? 0 : '1';
			ratingsBarRef5.current.style.width = `${rating5}%`;
			ratingsBarRef4.current.style.opacity = rating4 === 0 ? 0 : '1';
			ratingsBarRef4.current.style.width = `${rating4}%`;
			ratingsBarRef3.current.style.opacity = rating3 === 0 ? 0 : '1';
			ratingsBarRef3.current.style.width = `${rating3}%`;
			ratingsBarRef2.current.style.opacity = rating2 === 0 ? 0 : '1';
			ratingsBarRef2.current.style.width = `${rating2}%`;
			ratingsBarRef1.current.style.opacity = rating1 === 0 ? 0 : '1';
			ratingsBarRef1.current.style.width = `${rating1}%`;
		};

		hideRatings = () => {

			if (
				ratingsBarRef5.current &&
				ratingsBarRef4.current &&
				ratingsBarRef3.current &&
				ratingsBarRef2.current &&
				ratingsBarRef1.current
			) {
				ratingsBarRef5.current.style.opacity = 0;
				ratingsBarRef5.current.style.width = 0;
				ratingsBarRef4.current.style.opacity = 0;
				ratingsBarRef4.current.style.width = 0;
				ratingsBarRef3.current.style.opacity = 0;
				ratingsBarRef3.current.style.width = 0;
				ratingsBarRef2.current.style.opacity = 0;
				ratingsBarRef2.current.style.width = 0;
				ratingsBarRef1.current.style.opacity = 0;
				ratingsBarRef1.current.style.width = 0;
			}
		};

		window.addEventListener('scroll',() => {
      console.log('inside event listener ==== ', ratingObj)
			// const sectionPos = await positionRef.current.getBoundingClientRect().top;
			const sectionPos = (positionRef.current)
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
			return () => window.removeEventListener('scroll', () => {
        calculatePercentage(reviews)
      });
		});
	});


	return (
		<>
			<div className='animated-bar-container' ref={positionRef}>
				<div
					className='animated-bar'
					id='animated-bar5'
					ref={ratingsBarRef5}></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar4'
					ref={ratingsBarRef4}></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar3'
					ref={ratingsBarRef3}></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar2'
					ref={ratingsBarRef2}></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar1'
					ref={ratingsBarRef1}></div>
			</div>
		</>
	);
}
