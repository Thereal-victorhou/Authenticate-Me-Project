import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { newReview } from '../../store/reviews'

function AddReviewForm({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const restaurantId = id;
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(0);
    const updateBody = (e) => setBody(e.target.value)

    const userId = user.id;

    useEffect(()=> {}, [dispatch, rating]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewPayload = {
            body,
            restaurantId,
            rating
        };

        await dispatch(newReview(reviewPayload, userId));
        history.push(`/restaurants/${id}`);
    }

    const handleStars = async(e) => {
        e.preventDefault();

        switch(e.target.id) {
            case 'one':
                return setRating(1);
            case 'two':
                return setRating(2);
            case 'three':
                return setRating(3);
            case 'four':
                return setRating(4);
            case 'five':
                return setRating(5);
        }
    }

    return(
        <>
            <h1>Hello from Add Review Page</h1>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className='stars_container_review_page' onChange={handleStars}></div>

                        <button type='button' className='star' id='one' value={rating} onClick={handleStars}>★</button>
                        <button type='button' className='star' id='two' value={rating} onClick={handleStars}>★</button>
                        <button type='button' className='star' id='three' value={rating} onClick={handleStars}>★</button>
                        <button type='button' className='star' id='four' value={rating} onClick={handleStars}>★</button>
                        <button type='button' className='star' id='five' value={rating} onClick={handleStars}>★</button>
                    <textarea
                        className='review_body'
                        value={body}
                        onChange={updateBody}
                    ></textarea>
                    <button type='submit'>Post Review</button>
                </form>
            </section>

        </>
    )
}

export default AddReviewForm;
