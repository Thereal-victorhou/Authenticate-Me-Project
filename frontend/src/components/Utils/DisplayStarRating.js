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
            <img src={bigOneStar} id='one' alt='one star'/>
          </div>
        );
      case 2:
        return (
          <div className='big-star' id='two'>
            <img src={bigTwoStar} alt='two star'/>
          </div>
        );
      case 3:
        return (
          // <div className='big-star' id='three'>
            <img src={bigThreeStar} alt='three star'/>
          // </div>
        );
      case 4:
        return (
          <div className='big-star' id='four'>
            <img src={bigFourStar} alt='three star'/>
          </div>
        );
      case 5:
        return (
          <div className='big-star' id='five'>
            <img src={bigFiveStar} alt='three star'/>
          </div>
        );
      default:
        return (
          <div className='big-star' id='zero'>
            <img src={bigZeroStar}/>
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
          <img className='small-star-img'src={smallOneStar} alt='one star'/>
        </div>
      );
    case 2:
      return (
        <div className='star-img-container' id='two'>
          <img className='small-star-img'src={smallTwoStar} alt='two star'/>
        </div>
      );
    case 3:
      return (
        <div className='star-img-container' id='three'>
          <img className='small-star-img'id='three-star'src={smallThreeStar} alt='three star'/>
        </div>
      );
    case 4:
      return (
        <div className='star-img-container' id='four'>
          <img className='small-star-img'src={smallFourStar} alt='four star'/>
        </div>
      );
    case 5:
      return (
        <div className='star-img-container' id='five'>
          <img className='small-star-img'src={smallFiveStar} alt='five star'/>
        </div>
      );
  }
};

// translate ratings from number to star for search results
export const starRatingResults = (num) => {
  switch(num) {
    case 0:
      return (
        <div className='big-star' id='one'>
          <img src={bigZeroStar} id='zero' alt='zero star'/>
        </div>
      );
    case 1:
      return (
        <div className='big-star' id='one'>
          <img src={bigOneStar} id='one' alt='one star'/>
        </div>
      );
    case 1.5:
      return (
        <div className='big-star' id='one-half'>
          <img src={bigOneHalfStar} alt='one star'/>
        </div>
      );
    case 2:
      return (
        <div className='big-star' id='two'>
          <img src={bigTwoStar} alt='one star'/>
        </div>
      );
    case 2.5:
      return (
        <div className='big-star' id='two-half'>
          <img src={bigTwoHalfStar} alt='one star'/>
        </div>
      );
    case 3:
      return (
        <div className='big-star' id='three'>
          <img src={bigThreeStar} alt='one star'/>
        </div>
      );
    case 3.5:
      return (
        <div className='big-star' id='three-half'>
          <img src={bigThreeHalfStar} alt='one star'/>
        </div>
      );
    case 4:
      return (
        <div className='big-star' id='four'>
          <img src={bigFourStar} alt='one star'/>
        </div>
      );
    case 4.5:
      return (
        <div className='big-star' id='four-half'>
          <img src={bigFourHalfStar} alt='one star'/>
        </div>
      );
    case 5:
      return (
        <div className='big-star' id='five'>
          <img src={bigFiveStar} alt='one star'/>
        </div>
      );
  }
}
