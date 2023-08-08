import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { oneReview, deleteOneReview } from '../../store/reviews';
import * as sessionActions from '../../store/session';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function FunctionalButtonModal ({ user, review }){

  const history = useHistory();
	const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  // };

  const handleButton = async (e, reviewId) => {
		e.preventDefault();

		switch (e.target.getAttribute('id')) {
			case 'edit':
				await dispatch(oneReview(reviewId));
				history.push(`/edit/review/${reviewId}`);

				break;
			case 'delete':
				// setCounter(prev => prev + 1)
				dispatch(deleteOneReview(reviewId));
				window.scrollTo(0, 0);
				break;
		}
	};

  return (
    <>
      {user && user.id === review.userId &&
        <button className='three-dots-optional' onClick={openMenu}>
          <MoreHorizIcon />
        </button>
      }
      {showMenu && (
      <div className='optional-buttons-container' id={`${review.id}-optional-button`}>
        <button
          className='function-button'
          id='edit'
          value={review.id}
          onClick={(e) => handleButton(e, review.id)}>
          Edit Review
        </button>
        <button
          className='function-button'
          id='delete'
          value={review.id}
          onClick={(e) => handleButton(e, review.id)}>
          Delete Review
        </button>
      </div>
      ) }
    </>
  )
}

export default FunctionalButtonModal;
