
export default function AnimatedRatingDisplay({ reviews }) {

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

  console.log(ratingObj);

  return (
    <>
      <div className='animated-bar-container'>
        <div className='animated-bar5' style={{ width: `${ratingObj['5']}%`}}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar4' style={{ width: `${ratingObj['4']}%`}}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar3' style={{ width: `${ratingObj['3']}%`}}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar2' style={{ width: `${ratingObj['2']}%`}}></div>
      </div>
      <div className='animated-bar-container'>
        <div className='animated-bar1' style={{ width: `${ratingObj['1']}%`}}></div>
      </div>
    </>
  )
}
