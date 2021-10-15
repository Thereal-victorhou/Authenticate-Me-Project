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
    const updateBody = (e) => setBody(e.target.value)

    const userId = user.id;

    // useEffect(()=> {
    //     setBody(body)
    // }, [dispatch, body]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewPayload = {
            body,
            restaurantId
        };

        await dispatch(newReview(reviewPayload, userId));
        history.push(`/restaurants/${id}`);
    }

    return(
        <>
            <h1>Hello from Add Review Page</h1>
            <section>
                <form onSubmit={handleSubmit}>
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
