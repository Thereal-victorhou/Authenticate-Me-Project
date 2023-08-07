import bigZeroStar from '../../images/small_0@2x.png';
import bigOneStar from '../../images/small_1@2x.png';
import bigTwoStar from '../../images/small_2@2x.png';
import bigThreeStar from '../../images/small_3@2x.png';
import bigFourStar from '../../images/small_4@2x.png';
import bigFiveStar from '../../images/small_5@2x.png';

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
          <span id='one'>★</span>
          <span id='zero'>★</span>
          <span id='zero'>★</span>
          <span id='zero'>★</span>
          <span id='zero'>★</span>
        </div>
      );
    case 2:
      return (
        <div className='star' id='two'>
          <span id='two'>★</span>
          <span id='two'>★</span>
          <span id='zero'>★</span>
          <span id='zero'>★</span>
          <span id='zero'>★</span>
        </div>
      );
    case 3:
      return (
        <div className='star' id='three'>
          <span id='three'>★</span>
          <span id='three'>★</span>
          <span id='three'>★</span>
          <span id='zero'>★</span>
          <span id='zero'>★</span>
        </div>
      );
    case 4:
      return (
        <div className='star' id='four'>
          <span id='four'>★</span>
          <span id='four'>★</span>
          <span id='four'>★</span>
          <span id='four'>★</span>
          <span id='zero'>★</span>
        </div>
      );
    case 5:
      return (
        <div className='star' id='five'>
          <span id='five'>★</span>
          <span id='five'>★</span>
          <span id='five'>★</span>
          <span id='five'>★</span>
          <span id='five'>★</span>
        </div>
      );
  }
};
