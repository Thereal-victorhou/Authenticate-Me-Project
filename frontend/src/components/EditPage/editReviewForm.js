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
            <h1>Hello from Edit Review Page</h1>
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
                    >{body ? body : "body to slow"}</textarea>
                    <button type='submit'>Edit Review</button>
                </form>
            </section>

        </>
    )
}

export default EditReviewForm;
