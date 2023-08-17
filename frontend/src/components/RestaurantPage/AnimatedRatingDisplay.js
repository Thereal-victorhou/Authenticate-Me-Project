import React, { useEffect, useState, useRef } from 'react';


export default function AnimatedRatingDisplay({ reviews }) {

  const ratingObj = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  }

  const positionRef = useRef();

  const [rating1, setRating1] = useState(0)
  const [rating2, setRating2] = useState(0)
  const [rating3, setRating3] = useState(0)
  const [rating4, setRating4] = useState(0)
  const [rating5, setRating5] = useState(0)

  const bars = document.querySelectorAll('.animated-bar');

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

  const showRatings = () => {
    console.log('inside show rating ', bars)
    bars?.forEach(bar => {
      const value = bar.value;
      bar.style.opacity = 1;
      bar.style.width = `${value}%`;
      console.log('showRating ====== ', bar)
    })

  }

  const hideRatings = () => {
    console.log('inside hideRating', bars)
    bars?.forEach(bar => {
      bar.style.opacity = 0;
      bar.style.width = 0;
      console.log('hideRating ======= ', bar)
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const sectionPos = positionRef.current.getBoundingClientRect().top
      const screenPos =  window.innerHeight;

      if (sectionPos < screenPos) {
        showRatings()
      } else {
        hideRatings()
      }
    })
  }, [])

  return (
    <>
      <div className='animated-bar-container' ref={positionRef}>
        <div className='animated-bar' id='animated-bar5' value={`${ratingObj['5']}%`}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar' id='animated-bar4' value={`${ratingObj['4']}%`}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar' id='animated-bar3' value={`${ratingObj['3']}%`}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar' id='animated-bar2' value={`${ratingObj['2']}%`}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar' id='animated-bar1' value={`${ratingObj['1']}%`}></div>
      </div>
    </>
  )
}
