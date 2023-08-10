import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { oneRestaurant } from '../../store/restaurant';

import bigZeroStar from '../../images/regular_0@2x.png';
import bigOneStar from '../../images/regular_1@2x.png';
import bigTwoStar from '../../images/regular_2@2x.png';
import bigThreeStar from '../../images/regular_3@2x.png';
import bigFourStar from '../../images/regular_4@2x.png';
import bigFiveStar from '../../images/regular_5@2x.png';

function LiveStarRatingDisplay({ restaurant, number, user}) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [stars, setStars] = useState(bigZeroStar);

  // Reset stars to default
	const resetStars = () => {
    setStars(bigZeroStar)
  };

  // Add setVal to current star
	const addStars = (starVal) => {

    resetStars()

    switch (starVal) {
      case 1:
        setStars(bigOneStar)
        break;
      case 2:
        setStars(bigTwoStar)
        break;
      case 3:
        setStars(bigThreeStar)
        break;
      case 4:
        setStars(bigFourStar)
        break;
      case 5:
        setStars(bigFiveStar)
        break;
    }
  };

	const handleStars = async (e, starVal, position) => {
    e.preventDefault()
    //  console.log('starVal ===== ',starVal)
    // console.log('position ===== ',position)
    // console.log( '=================================')
    if (!user) return history.push('/login');
    await dispatch(oneRestaurant(restaurant.id));
    history.push(`/review/restaurant/${restaurant.id}/${starVal}`)

  };

	return (
		<div className={`stars-container-each${number}`}>
			<div
				className={`star-rating${number}`}
				style={{
					backgroundImage: `url(${stars})`,
					backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
				}}
        type='button'
				onMouseOut={() => addStars(0, number)}>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s1'
					onClick={(e) => handleStars(e, 1, number, restaurant)}
					onMouseEnter={() => addStars(1, number)}>
					{/* <span className={`star-one${number} zero-star`}></span> */}
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s2'
					onClick={(e) => handleStars(e, 2, number, restaurant)}
					onMouseEnter={() => addStars(2, number)}>
					{/* <span className={`star-two${number} zero-star`}></span> */}
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s3'
					onClick={(e) => handleStars(e, 3, number, restaurant)}
					onMouseEnter={() => addStars(3, number)}>
					{/* <span className={`star-three${number} zero-star`}></span> */}
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s4'
					onClick={(e) => handleStars(e, 4, number, restaurant)}
					onMouseEnter={() => addStars(4, number)}>
					{/* <span className={`star-four${number} zero-star`}></span> */}
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s5'
					onClick={(e) => handleStars(e, 5, number, restaurant)}
					onMouseEnter={() => addStars(5, number)}>
					{/* <span className={`star-five${number} zero-star`}></span> */}
				</div>
			</div>
			{/* <div className='rating-phrase-container'>
				<p>{ratingPhrase}</p>
			</div> */}
		</div>
	);
}

export default LiveStarRatingDisplay;
