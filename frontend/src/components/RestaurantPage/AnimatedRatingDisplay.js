import React, { useEffect, useState } from 'react';

export default function AnimatedRatingDisplay({ reviews }) {

  const [rating1, setRating1] = useState(0)
  const [rating2, setRating2] = useState(0)
  const [rating3, setRating3] = useState(0)
  const [rating4, setRating4] = useState(0)
  const [rating5, setRating5] = useState(0)

  const ratingObj = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  }

  reviews.forEach(review => {
    if (review.rating === 5) ratingObj['5'] += 1;
    if (review.rating === 4) ratingObj['4'] += 1;
    if (review.rating === 3) ratingObj['3'] += 1;
    if (review.rating === 2) ratingObj['2'] += 1;
    if (review.rating === 1) ratingObj['1'] += 1;
  })

  for (let rating in ratingObj) {
    const amount = ratingObj[rating];
    ratingObj[rating] = Math.floor((amount / reviews.length) * 100);
  }

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 700) {

            setRating1(ratingObj['1']);
            setRating2(ratingObj['2']);
            setRating3(ratingObj['3']);
            setRating4(ratingObj['4']);
            setRating5(ratingObj['5']);
            window.removeEventListener('scroll', handleScroll);
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className='animated-bar-container'>
        <div className='animated-bar5' style={{ width: `${rating5}%`}}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar4' style={{ width: `${rating4}%`}}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar3' style={{ width: `${rating3}%`}}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar2' style={{ width: `${rating2}%`}}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar1' style={{ width: `${rating1}%`}}></div>
      </div>
    </>
  )
}
