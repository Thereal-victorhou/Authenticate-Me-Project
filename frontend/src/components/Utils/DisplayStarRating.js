import bigZeroStar from '../../images/regular_0@2x.png';
import smallZeroStar from '../../images/regular_0.png';
import bigOneStar from '../../images/regular_1@2x.png';
import smallOneStar from '../../images/regular_1.png';
import bigTwoStar from '../../images/regular_2@2x.png';
import smallTwoStar from '../../images/regular_2.png';
import bigThreeStar from '../../images/regular_3@2x.png';
import smallThreeStar from '../../images/regular_3.png';
import bigFourStar from '../../images/regular_4@2x.png';
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
        <div className='star' id='one'>
          <img src={smallOneStar} alt='one star'/>
        </div>
      );
    case 2:
      return (
        <div className='star' id='two'>
          <img src={smallTwoStar} alt='two star'/>
        </div>
      );
    case 3:
      return (
        <div className='star' id='three'>
          <img src={smallThreeStar} alt='three star'/>
        </div>
      );
    case 4:
      return (
        <div className='star' id='four'>
          <img src={smallFourStar} alt='four star'/>
        </div>
      );
    case 5:
      return (
        <div className='star' id='five'>
          <img src={smallFiveStar} alt='five star'/>
        </div>
      );
  }
};
