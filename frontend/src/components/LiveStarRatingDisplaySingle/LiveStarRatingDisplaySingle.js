import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { oneRestaurant } from '../../store/restaurant';
import './LiveStarRatingDisplaySingle.css';

import bigZeroStar from '../../images/regular_0@2x.png';
import bigOneStar from '../../images/regular_1@2x.png';
import bigTwoStar from '../../images/regular_2@2x.png';
import bigThreeStar from '../../images/regular_3@2x.png';
import bigFourStar from '../../images/regular_4@2x.png';
import bigFiveStar from '../../images/regular_5@2x.png';

const starRatingObj = {
  '1': bigOneStar,
  '2': bigTwoStar,
  '3': bigThreeStar,
  '4': bigFourStar,
  '5': bigFiveStar
}

const ratingPhraseObj = {
  '1': 'Not good',
  '2': "Could've been better",
  '3': 'OK',
  '4': 'Good',
  '5': 'Great'
}

function LiveStarRatingDisplaySingle({ saveRating, selectedRating }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const [stars, setStars] = useState(selectedRating ? starRatingObj[selectedRating] : bigZeroStar);
  const [rating, setRating] = useState(0);
	const [ratingPhrase, setRatingPhrase] = useState(selectedRating ? ratingPhraseObj[selectedRating] : 'Select your rating');


  // Reset stars to default
	const resetStars = () => {
    setStars(bigZeroStar)
    setRatingPhrase('Select your rating')
    // const starClass = starsMainDiv.getAttribute('class')
  };

  // Add setVal to current star
	const addStars = (starVal) => {

    resetStars();
    setRatingPhrase(ratingPhraseObj[starVal]);
    
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

	const handleStars = async (e, starVal) => {
    e.preventDefault()
    saveRating(starVal)

    switch (starVal) {
			case 1:
				setRating(1);
				addStars(1);
				break;

			case 2:
				setRating(2);
				addStars(2);
				break;

			case 3:
				setRating(3);
				addStars(3);
				break;

			case 4:
				setRating(4);
				addStars(4);
				break;

			case 5:
				setRating(5);
				addStars(5);
				break;
		}
  };

	return (
		<div className={`stars-container-each`}>
			<div
				className={`star-rating`}
				style={{
					backgroundImage: `url(${stars})`,
					backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
				}}
        type='button'
				onMouseOut={() => addStars(rating)}>
				<div
					type='radio'
					name='star-container'
					className={`star-container`}
					data-hover='Not good'
					id='s1'
					onClick={(e) => handleStars(e, 1)}
					onMouseEnter={() => addStars(1)}>
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container`}
					data-hover="Could've been better"
					id='s2'
					onClick={(e) => handleStars(e, 2)}
					onMouseEnter={() => addStars(2)}>
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container`}
					data-hover='OK'
					id='s3'
					onClick={(e) => handleStars(e, 3)}
					onMouseEnter={() => addStars(3)}>
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container`}
					data-hover='Good'
					id='s4'
					onClick={(e) => handleStars(e, 4)}
					onMouseEnter={() => addStars(4)}>
				</div>
				<div
					type='radio'
					name='star-container'
					className={`star-container`}
					data-hover='Great'
					id='s5'
					onClick={(e) => handleStars(e, 5)}
					onMouseEnter={() => addStars(5)}>
				</div>
			</div>
			<div className='rating-phrase-container'>
				<p>{ratingPhrase}</p>
			</div>
		</div>
	);
}

export default LiveStarRatingDisplaySingle;
