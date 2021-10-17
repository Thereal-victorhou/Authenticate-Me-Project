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
        switch(e.target.value) {
            case 1:
                setRating(1);
                console.log(rating)
            case 2:
                return setRating(e.target.value + 2);
            case 3:
                return setRating(e.target.value + 3);
            case 4:
                return setRating(e.target.value + 4);
            case 5:
                return setRating(e.target.value + 5);
        }
    }

  console.log(rating)

    return(
        <>
            <h1>Hello from Add Review Page</h1>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className='stars_container_review_page'></div>
                        <button type='button' className='star' id='one' value={rating} onClick={handleStars}>★</button>
                        <button className='star' id='two' value={rating} onClick={handleStars}>★</button>
                        <button className='star' id='three' value={rating} onClick={handleStars}>★</button>
                        <button className='star' id='four' value={rating} onClick={handleStars}>★</button>
                        <button className='star' id='five' value={rating} onClick={handleStars}>★</button>
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
