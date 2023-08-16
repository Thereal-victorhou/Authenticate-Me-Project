
export default function AnimatedRatingDisplay({ reviews }) {

  const ratingObj = {}

  reviews.forEach(review => {
    if (review.rating === 5) ratingObj['5'] = review.rating;
    if (review.rating === 4) ratingObj['4'] = review.rating;
    if (review.rating === 3) ratingObj['3'] = review.rating;
    if (review.rating === 2) ratingObj['2'] = review.rating;
    if (review.rating === 1) ratingObj['1'] = review.rating;
  })

  return (
    <>
      <div className='animated-bar-container'>
        <div className='animated-bar'></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar'></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar'></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar'></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar'></div>
      </div>
    </>
  )
}
