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
    const restaurantId = id;


    const singleReview = useSelector(state => state?.review[`${id}`])
    console.log(singleReview)
    // useEffect(() =>{
        //     dispatch(oneReview(singleReview))
        // }, [dispatch, id]);

        // finding review body
        // const sessionRestaurants = useSelector(state => Object.values(state.restaurant));
        // const currentRestaurant = sessionRestaurants?.find(restaurant => restaurant.id === parseInt(id, 10));
        // const currentReview = currentRestaurant?.Reviews?.find(review => review?.id === singleReview?.id?.id);
        // console.log(currentReview);

    const [body, setBody] = useState(`${singleReview?.body}`);
    const updateBody = (e) => setBody(e.target.value)
    useEffect(() =>{}, [dispatch, body])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewPayload = {
            body,
            userId,
            restaurantId
        };
        await dispatch(editOldReview(reviewPayload, userId));
        history.push(`/restaurants/${id}`);
    }

    return(
        <>
            <h1>Hello from Edit Review Page</h1>
            <section>
                <form onSubmit={handleSubmit}>
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
