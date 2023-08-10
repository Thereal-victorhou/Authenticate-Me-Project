import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import bigZeroStar from '../../images/regular_0@2x.png';
import bigOneStar from '../../images/regular_1@2x.png';
import bigTwoStar from '../../images/regular_2@2x.png';
import bigThreeStar from '../../images/regular_3@2x.png';
import bigFourStar from '../../images/regular_4@2x.png';
import bigFiveStar from '../../images/regular_5@2x.png';

function LiveStarRatingDisplay({ restaurant, number }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [rating, setRating] = useState(0);
	const [currentVal, setCurrentVal] = useState(0);
	const [stars, setStars] = useState(bigZeroStar);
	// const [star2, setStar2] = useState(bigTwoStar);
	// const [star3, setStar3] = useState(bigThreeStar);
	// const [star4, setStar4] = useState(bigFourStar);
	// const [star5, setStar5] = useState(bigFiveStar);

	const resetStars = (starVal, position) => {
    setStars(bigZeroStar)
  };

	const addStars = (starVal, position) => {

    resetStars(starVal, position)
    // console.log('starVal ===== ',starVal)
    // console.log('position ===== ',position)
    // console.log( '=================================')

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

	const handleStars = () => {};

	return (
		<div className={`stars-container-each${number}`}>
			<div
				className={`star-rating${number}`}
				style={{
					backgroundImage: `url(${stars})`,
					backgroundRepeat: 'no-repeat',
				}}
        type='button'
				onMouseOut={() => addStars(0, number)}>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s1'
					onClick={(e) => handleStars(e, 1)}
					onMouseEnter={() => addStars(1, number)}>
					{/* <span className={`star-one${number} zero-star`}></span> */}
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s2'
					onClick={(e) => handleStars(e, 2)}
					onMouseEnter={() => addStars(2, number)}>
					{/* <span className={`star-two${number} zero-star`}></span> */}
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s3'
					onClick={(e) => handleStars(e, 3)}
					onMouseEnter={() => addStars(3, number)}>
					{/* <span className={`star-three${number} zero-star`}></span> */}
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s4'
					onClick={(e) => handleStars(e, 4)}
					onMouseEnter={() => addStars(4, number)}>
					{/* <span className={`star-four${number} zero-star`}></span> */}
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container-${number}`}
					id='s5'
					onClick={(e) => handleStars(e, 5)}
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
