import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { newReview } from '../../store/reviews'
import { oneRestaurant } from '../../store/restaurant'

function AddReviewForm({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const restaurantId = id;
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(0);
    const updateBody = (e) => setBody(e.target.value)

    const userId = user.id;

    const currentRestaurant = useSelector(state => state.restaurant)

    useEffect(()=> {
        dispatch(oneRestaurant(id))
    }, [dispatch]);

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

    // const handleStars = async(e) => {
    //     e.preventDefault();

    //     switch(e.target.id) {
    //         case 'one':
    //             return setRating(1);
    //         case 'two':
    //             return setRating(2);
    //         case 'three':
    //             return setRating(3);
    //         case 'four':
    //             return setRating(4);
    //         case 'five':
    //             return setRating(5);
    //     }
    // }

    // Render Stars upon mouse hover
    const addStars= (num) => {
        let star1;
        let star2;
        let star3;
        let star4;
        let star5;

        // Select stars from DOM
        star1 = document.querySelector(".star-one")
        star2 = document.querySelector(".star-two")
        star3 = document.querySelector(".star-three")
        star4 = document.querySelector(".star-four")
        star5 = document.querySelector(".star-five")

        switch(num) {
            case 1:
                star1.classList.remove("zero-star")
                star1.classList.add("starz-one")
                break;
            case 2:
                star1.classList.remove("zero-star")
                star2.classList.remove("zero-star")
                star1.classList.add("starz-two")
                star2.classList.add("starz-two")
                break;
            case 3:
                star1.classList.remove("zero-star")
                star2.classList.remove("zero-star")
                star3.classList.remove("zero-star")
                star1.classList.add("starz-three")
                star2.classList.add("starz-three")
                star3.classList.add("starz-three")
                break;
            case 4:
                star1.classList.remove("zero-star")
                star2.classList.remove("zero-star")
                star3.classList.remove("zero-star")
                star4.classList.remove("zero-star")
                star1.classList.add("starz-four")
                star2.classList.add("starz-four")
                star3.classList.add("starz-four")
                star4.classList.add("starz-four")
                break;
            case 5:
                star1.classList.remove("zero-star")
                star2.classList.remove("zero-star")
                star3.classList.remove("zero-star")
                star4.classList.remove("zero-star")
                star5.classList.remove("zero-star")
                star1.classList.add("starz-five")
                star2.classList.add("starz-five")
                star3.classList.add("starz-five")
                star4.classList.add("starz-five")
                star5.classList.add("starz-five")
                break;
        }
    }


    // Remove Stars After mouse hover
    const removeStars = () => {
        let star1;
        let star2;
        let star3;
        let star4;
        let star5;

        // Find what the classList of each star is
        star1 = document.querySelector(".star-one");
        let star1CL = document.querySelector(".star-one").getAttribute('class');
        let star1Arr = star1CL.split(" ");

        star2 = document.querySelector(".star-two");
        let star2CL = document.querySelector(".star-two").getAttribute('class');
        let star2Arr = star2CL.split(" ");

        star3 = document.querySelector(".star-three");
        let star3CL = document.querySelector(".star-three").getAttribute('class');
        let star3Arr = star3CL.split(" ");

        star4 = document.querySelector(".star-four");
        let star4CL = document.querySelector(".star-four").getAttribute('class');
        let star4Arr = star4CL.split(" ");

        star5 = document.querySelector(".star-five");
        let star5CL = document.querySelector(".star-five").getAttribute('class');
        let star5Arr = star5CL.split(" ");


        // Remove class if it's not equal to base
        star1Arr.forEach(each => {
            if (!(each === 'star-one')) {
                star1.classList.remove(`${each}`)
            }
        })
        star1.classList.add('zero-star');

        star2Arr.forEach(each => {
            if (!(each === 'star-two')) {
                star2.classList.remove(`${each}`)
            }
        })
        star2.classList.add('zero-star');

        star3Arr.forEach(each => {
            if (!(each === 'star-three')) {
                star3.classList.remove(`${each}`)
            }
        })
        star3.classList.add('zero-star');

        star4Arr.forEach(each => {
            if (!(each === 'star-four')) {
                star4.classList.remove(`${each}`)
            }
        })
        star4.classList.add('zero-star')

        star5Arr.forEach(each => {
            if (!(each === 'star-five')) {
                star5.classList.remove(`${each}`)
            }
        })
        star5.classList.add('zero-star')

    }

    return(
        <div className="review-container-main">
            <div className="review-upper">
                <h1>{currentRestaurant && currentRestaurant['1']?.name}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='stars_container'>
                    {/* <button type='button' className='star-button' id='one' value={rating} onClick={handleStars}>★</button>
                    <button type='button' className='star-button' id='two' value={rating} onClick={handleStars}>★</button>
                    <button type='button' className='star-button' id='three' value={rating} onClick={handleStars}>★</button>
                    <button type='button' className='star-button' id='four' value={rating} onClick={handleStars}>★</button>
                    <button type='button' className='star-button' id='five' value={rating} onClick={handleStars}>★</button> */}
                <div className="star-rating">
                    <span class="star-one zero-star" onMouseEnter={()=> addStars(1)} onMouseOut={()=> removeStars()}>★</span>
                    <span class="star-two zero-star" onMouseEnter={()=> addStars(2)} onMouseOut={()=> removeStars()}>★</span>
                    <span class="star-three zero-star" onMouseEnter={()=> addStars(3)} onMouseOut={()=> removeStars()}>★</span>
                    <span class="star-four zero-star" onMouseEnter={()=> addStars(4)} onMouseOut={()=> removeStars()}>★</span>
                    <span class="star-five zero-star"onMouseEnter={()=> addStars(5)} onMouseOut={()=> removeStars()}>★</span>
                </div>
                </div>
                <div className='textarea-container'>
                    <textarea
                        className='review_body'
                        value={body}
                        onChange={updateBody}
                    ></textarea>
                </div>
                <div className='post-button-container'>
                    <button className='post-button' type='submit'>Post Review</button>
                </div>
            </form>
        </div>




    )
}

export default AddReviewForm;
