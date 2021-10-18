import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editOldReview } from '../../store/reviews'
import { oneReview } from '../../store/reviews'

function EditReviewForm({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const userId = user.id;

    const singleReview = useSelector(state => state?.review[`${id}`])
    const restaurantId = singleReview?.restaurantId;

    const [rating, setRating] = useState(singleReview?.rating);

    useEffect(() =>{
            dispatch(oneReview(singleReview))
        }, [dispatch, id]);


    const [body, setBody] = useState(`${singleReview?.body}`);
    const updateBody = (e) => setBody(e.target.value)
    useEffect(() =>{}, [dispatch, body])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (singleReview) {

            const reviewPayload = {
                body,
                userId,
                restaurantId,
                rating,
                reviewId: singleReview?.id
            };
            // console.log(singleReview.id);
            // console.log(restaurantId);
            await dispatch(editOldReview(reviewPayload));
            history.push(`/restaurants/${singleReview?.restaurantId}`);
        }
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
            <h1>Edit Review</h1>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className='stars_container' onChange={handleStars}>
                        <button type='button' className='star-button' id='one' value={rating} onClick={handleStars}>★</button>
                        <button type='button' className='star-button' id='two' value={rating} onClick={handleStars}>★</button>
                        <button type='button' className='star-button' id='three' value={rating} onClick={handleStars}>★</button>
                        <button type='button' className='star-button' id='four' value={rating} onClick={handleStars}>★</button>
                        <button type='button' className='star-button' id='five' value={rating} onClick={handleStars}>★</button>
                    </div>
                    <div className='textarea-container'>
                        <textarea
                            className='review_body'
                            value={body}
                            onChange={updateBody}
                        ></textarea>
                    </div>
                    <div className='post-button-container'>
                        <button className='post-button' type='submit'>Edit Review</button>
                    </div>
                </form>
            </section>

        </>
    )
}

export default EditReviewForm;
