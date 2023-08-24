import bigZeroStar from '../../images/regular_0@2x.png';
import bigOneStar from '../../images/regular_1@2x.png';
import bigOneHalfStar from '../../images/regular_1_half@2x.png';
import smallOneStar from '../../images/regular_1.png';
import bigTwoStar from '../../images/regular_2@2x.png';
import bigTwoHalfStar from '../../images/regular_2_half@2x.png';
import smallTwoStar from '../../images/regular_2.png';
import bigThreeStar from '../../images/regular_3@2x.png';
import bigThreeHalfStar from '../../images/regular_3_half@2x.png';
import smallThreeStar from '../../images/regular_3.png';
import bigFourStar from '../../images/regular_4@2x.png';
import bigFourHalfStar from '../../images/regular_4_half@2x.png';
import smallFourStar from '../../images/regular_4.png';
import bigFiveStar from '../../images/regular_5@2x.png';
import smallFiveStar from '../../images/regular_5.png';

export const starRatingBig = (num) => {
	switch (num) {
		case 1:
			return (
				<div className='big-star' id='one'>
					<img src={bigOneStar} id='one' alt='one star' />
				</div>
			);
		case 1.5:
			return (
				<div className='big-star' id='oneHalf'>
					<img src={bigOneHalfStar} alt='one and a half star' />
				</div>
			);
		case 2:
			return (
				<div className='big-star' id='two'>
					<img src={bigTwoStar} alt='two star' />
				</div>
			);
		case 2.5:
			return (
				<div className='big-star' id='twoHalf'>
					<img src={bigTwoHalfStar} alt='two and a half star' />
				</div>
			);
		case 3:
			return (
				<div className='big-star' id='three'>
					<img src={bigThreeStar} alt='three star' />
				</div>
			);
		case 3.5:
			return (
				<div className='big-star' id='threeHalf'>
					<img src={bigThreeHalfStar} alt='three and a half star' />
				</div>
			);
		case 4:
			return (
				<div className='big-star' id='four'>
					<img src={bigFourStar} alt='three star' />
				</div>
			);
		case 4.5:
			return (
				<div className='big-star' id='fourHalf'>
					<img src={bigFourHalfStar} alt='four and a half star' />
				</div>
			);
		case 5:
			return (
				<div className='big-star' id='five'>
					<img src={bigFiveStar} alt='three star' />
				</div>
			);
		default:
			return (
				<div className='big-star' id='zero'>
					<img src={bigZeroStar} />
				</div>
			);
	}
};

// translate ratings from number to star *little stars*
export const starRatingSmall = (num) => {
	switch (num) {
		case 1:
			return (
				<div className='star-img-container' id='one'>
					<img className='small-star-img' src={smallOneStar} alt='one star' />
				</div>
			);
		case 2:
			return (
				<div className='star-img-container' id='two'>
					<img className='small-star-img' src={smallTwoStar} alt='two star' />
				</div>
			);
		case 3:
			return (
				<div className='star-img-container' id='three'>
					<img
						className='small-star-img'
						id='three-star'
						src={smallThreeStar}
						alt='three star'
					/>
				</div>
			);
		case 4:
			return (
				<div className='star-img-container' id='four'>
					<img className='small-star-img' src={smallFourStar} alt='four star' />
				</div>
			);
		case 5:
			return (
				<div className='star-img-container' id='five'>
					<img className='small-star-img' src={smallFiveStar} alt='five star' />
				</div>
			);
	}
};

// translate ratings from number to star for search results
export const starRatingResults = (num) => {
	console.log('num num === ', num)
	switch (num) {
    case 1:
      return (
        <div className='results-big-star' id='one'>
					<img src={bigOneStar} id='one' alt='one star' />
				</div>
			);
      case 1.5:
        return (
          <div className='results-big-star' id='one-half-star'>
					<img src={bigOneHalfStar} alt='one and a half star' />
				</div>
			);
      case 2:
        return (
          <div className='results-big-star' id='two-star'>
					<img src={bigTwoStar} alt='two star' />
				</div>
			);
      case 2.5:
        return (
          <div className='results-big-star' id='two-half-star'>
					<img src={bigTwoHalfStar} alt='two and a half star' />
				</div>
			);
      case 3:
        return (
          <div className='results-big-star' id='three-star'>
					<img src={bigThreeStar} alt='three star' />
				</div>
			);
      case 3.5:
        return (
          <div className='results-big-star' id='three-half-star'>
					<img src={bigThreeHalfStar} alt='three and a half star' />
				</div>
			);
      case 4:
        return (
        <div className='results-big-star' id='four-star'>
					<img src={bigFourStar} alt='four star' />
				</div>
			);
      case 4.5:
        return (
          <div className='results-big-star' id='four-half-star'>
					<img src={bigFourHalfStar} alt='four and a half star' />
				</div>
			);
      case 5:
        return (
        <div className='results-big-star' id='five-star'>
					<img src={bigFiveStar} alt='five star' />
				</div>
			);
      default:
        return (
          <div className='results-big-star' id='zero-star'>
            <img src={bigZeroStar} alt='zero star' />
          </div>
        );
    }
  };

	export const infoRating = {

		1: `<div className='-info-big-star' id='one'>
					<img src="${bigOneStar}" style='height: 20px' id='one' alt='one star' />
				</div>`,


		1.5:
				`<div className='-info-big-star' id='one-half-star'>
					<img src="${bigOneHalfStar}" style='height: 20px' alt='one and a half star' />
				</div>`,

		2:
			`<div className='-info-big-star' id='two-star'>
				<img src="${bigTwoStar}" style='height: 20px' alt='two star' />
			</div>`,


		2.5:
				`<div className='-info-big-star' id='two-half-star'>
					<img src="${bigTwoHalfStar}" style='height: 20px' alt='two and a half star' />
				</div>`,

		3:
			`<div className='-info-big-star' id='three-star'>
				<img src="${bigThreeStar}" style='height: 20px' alt='three star' />
			</div>`,

		3.5:
				`<div className='-info-big-star' id='three-half-star'>
					<img src="${bigThreeHalfStar}" style='height: 20px' alt='three and a half star' />
				</div>`,

		4:
			`<div className='-info-big-star' id='four-star'>
				<img src="${bigFourStar}" style='height: 20px' alt='four star' />
			</div>`,

		4.5:
				`<div className='-info-big-star' id='four-half-star'>
					<img src="${bigFourHalfStar}" style='height: 20px' alt='four and a half star' />
				</div>`,

		5:
			`<div className='-info-big-star' id='five-star'>
				<img src="${bigFiveStar}" style='height: 20px' alt='five star' />
			</div>`,

		0:
			`<div className='-info-big-star' id='zero-star'>
				<img src="${bigZeroStar}" style='height: 20px' alt='zero star' />
			</div>`,
	}
