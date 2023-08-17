import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedRatingDisplay({ reviews }) {
	const ratingObj = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	};

	const positionRef = useRef(null);
	const ratingsBarRef1 = useRef(null);
	const ratingsBarRef2 = useRef(null);
	const ratingsBarRef3 = useRef(null);
	const ratingsBarRef4 = useRef(null);
	const ratingsBarRef5 = useRef(null);

	const [rating1, setRating1] = useState(0);
	const [rating2, setRating2] = useState(0);
	const [rating3, setRating3] = useState(0);
	const [rating4, setRating4] = useState(0);
	const [rating5, setRating5] = useState(0);

	const bars = document.querySelectorAll('.animated-bar');

	reviews.forEach((review) => {
		if (review.rating === 5) ratingObj['5'] += 1;
		if (review.rating === 4) ratingObj['4'] += 1;
		if (review.rating === 3) ratingObj['3'] += 1;
		if (review.rating === 2) ratingObj['2'] += 1;
		if (review.rating === 1) ratingObj['1'] += 1;
	});

	for (let rating in ratingObj) {
		const amount = ratingObj[rating];
		ratingObj[rating] = Math.floor((amount / reviews.length) * 100);
	}

	const showRatings = () => {
		if (
			ratingsBarRef5.current &&
			ratingsBarRef4.current &&
			ratingsBarRef3.current &&
			ratingsBarRef2.current &&
			ratingsBarRef1.current
		) {
			ratingsBarRef5.current.style.opacity = '1';
			ratingsBarRef5.current.style.width = `${ratingObj['5']}%`;
			ratingsBarRef4.current.style.opacity = '1';
			ratingsBarRef4.current.style.width = `${ratingObj['4']}%`;
			ratingsBarRef3.current.style.opacity = '1';
			ratingsBarRef3.current.style.width = `${ratingObj['3']}%`;
			ratingsBarRef2.current.style.opacity = '1';
			ratingsBarRef2.current.style.width = `${ratingObj['2']}%`;
			ratingsBarRef1.current.style.opacity = '1';
			ratingsBarRef1.current.style.width = `${ratingObj['1']}%`;
		}
	};

	const hideRatings = () => {
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

	useEffect(() => {

    window.addEventListener('scroll', () => {
      const sectionPos = positionRef.current ? positionRef.current.getBoundingClientRect().top : null;
      const screenPos = window.innerHeight;

      if (sectionPos === null) return;
			if (sectionPos < screenPos) {
				showRatings();
			} else {
				hideRatings();
			}
      return () => window.removeEventListener('scroll', () => {});
		});


	}, []);

	return (
		<>
			<div className='animated-bar-container' ref={positionRef}>
				<div
					className='animated-bar'
					id='animated-bar5'
					ref={ratingsBarRef5}
				></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar4'
					ref={ratingsBarRef4}
					></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar3'
					ref={ratingsBarRef3}
				></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar2'
					ref={ratingsBarRef2}
					></div>
			</div>
			<div className='animated-bar-container'>
				<div
					className='animated-bar'
					id='animated-bar1'
					ref={ratingsBarRef1}
        ></div>
			</div>
		</>
	);
}
