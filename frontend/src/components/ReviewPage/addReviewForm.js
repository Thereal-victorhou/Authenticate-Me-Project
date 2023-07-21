import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { newReview, getAllRevs } from '../../store/reviews'
import { oneRestaurant } from '../../store/restaurant'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AddReviewForm({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const restaurantId = id;
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(0);
    const [currentVal, setCurrentVal] = useState(0);
    const [ratingPhrase, setRatingPhrase] = useState("Select your rating")


    const userId = user.id;

    const currentRestaurant = useSelector(state => state.restaurant)

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

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(()=> {
        dispatch(oneRestaurant(id))
    }, [dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const reviewPayload = {
            body,
            restaurantId,
            rating
        };

        if (rating > 0 && body) {
            await dispatch(newReview(reviewPayload, userId));
            await dispatch(getAllRevs(restaurantId))
            history.push(`/restaurants/${id}`);
        } else {
            if (!rating>0 && !body) return alert('Please complete the form before submitting.')
            if (!rating>0) return alert('Please leave a rating before posting your review.')
            if (!body) return alert('Review requires a body.')
        }
    }

    // live update for textbody
    const updateBody = (e) => setBody(e.target.value);


    // Conditionally remove stars
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

        setRatingPhrase('Select your rating')
    }

    // Render Stars upon mouse hover
    const addStars= (num) => {
        removeStars()

        switch(num) {
            case 1:
                star1.classList.remove("zero-star")
                star1.classList.add("starz-one")
                setCurrentVal(1)
                setRatingPhrase("Not good")
                break;
            case 2:
                star1.classList.remove("zero-star")
                star2.classList.remove("zero-star")
                star1.classList.add("starz-two")
                star2.classList.add("starz-two")
                setCurrentVal(2)
                setRatingPhrase("Could've been better")
                break;
            case 3:
                star1.classList.remove("zero-star")
                star2.classList.remove("zero-star")
                star3.classList.remove("zero-star")
                star1.classList.add("starz-three")
                star2.classList.add("starz-three")
                star3.classList.add("starz-three")
                setCurrentVal(3)
                setRatingPhrase("OK")
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
                setCurrentVal(4)
                setRatingPhrase("Good")
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
                setCurrentVal(5)
                setRatingPhrase("Great")
                break;
        }
    }



    const handleStars = (e, num) => {
        e.preventDefault();

        switch(num) {
            case 1:
                setRating(1);
                addStars(1);
                // addStars(1);
                break;
            case 2:
                setRating(2);
                addStars(2);
                // addStars(2);
                break;
            case 3:
                setRating(3);
                addStars(3);
                // addStars(3);
                break;
            case 4:
                setRating(4);
                addStars(4);
                // addStars(4);
                break;
            case 5:
                setRating(5);
                addStars(5);
                // addStars(5);
                break;
        }
    }


    return(
        <div className="review-container-main">
            <div className="review-upper">
                <h1>{currentRestaurant && Object.values(currentRestaurant)[0]?.name}</h1>
            </div>
            <form className="review-form" onSubmit={handleSubmit}>
                <div className='stars_container'>
                    <div className="star-rating" onMouseOut={()=> addStars(rating)}>
                    <div type="radio" name="star-container" className="star-container" id="s1" onClick={(e)=> handleStars(e, 1)} onMouseEnter={()=> addStars(1)}>
                            <span className="star-one zero-star">★</span>
                        </div>
                        <div type="radio" name="star-container" className="star-container" id="s2" onClick={(e)=> handleStars(e, 2)}onMouseEnter={()=> addStars(2)}>
                            <span className="star-two zero-star">★</span>
                        </div>
                        <div type="radio" name="star-container" className="star-container" id="s3" onClick={(e)=> handleStars(e, 3)} onMouseEnter={()=> addStars(3)}>
                            <span className="star-three zero-star">★</span>
                        </div>
                        <div type="radio" name="star-container"className="star-container" id="s4" onClick={(e)=> handleStars(e, 4)} onMouseEnter={()=> addStars(4)} >
                            <span className="star-four zero-star">★</span>
                        </div>
                        <div type="radio" name="star-container" className="star-container" id="s5" onClick={(e)=> handleStars(e, 5)}onMouseEnter={()=> addStars(5)}>
                            <span className="star-five zero-star">★</span>
                        </div>
                    </div>
                    <div className="rating-phrase-container">
                        <p>{ratingPhrase}</p>
                    </div>
                </div>
                <div className='textarea-container'>
                    <textarea
                        className='review_body'
                        value={body}
                        onChange={updateBody}
                        placeholder="Doesn't look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the impossible hamburger and wow…  there are no words. A vegetarian burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There's about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can't go wrong. Not much else to say besides go see for yourself! You won't be disappointed."
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
