import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { newRestaurant } from '../../store/restaurant';

const AddRestauntPage = ({ user }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [restaurantName, setRestaurantName] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [imgSrc, setImgSrc] = useState("")

    const updateRestaurantName = (e) => {
        setRestaurantName(e.target.value)
    }
    const updateLocation = (e) => {
        setLocation(e.target.value)
    }
    const updatePhoneNumber = (e) => {
        if (e.target.value === '' || (/^[0-9]+$/.test(e.target.value))) {
            setPhoneNumber(e.target.value)
        }
    }
    const updateImg = (e) => {
        setImgSrc(e.target.value)
    }

    const addRestaurant = (e) => {
        e.preventDefault()

        if (restaurantName, location, phoneNumber, imgSrc) {
            setErrors([])

            return dispatch(newRestaurant({
                name: restaurantName,
                location: location,
                phoneNumber: phoneNumber,
                imgSrc: imgSrc,
                userId: user.id
            }))?.catch(async (res) => {
                if (res.status === 400) {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    return
                }
                history.push(`/`);
            })
        }
        return setErrors(['Please complete form before submitting.'])
    };

    return (
        <div className="add-restaurant-main">
            <div className='add-restaurant-title'>
                <h1>Add Restaurant</h1>
            </div>
            <div className='add-restaurant-mid'>
                <form className="add-restaurant-form">
                    <div className="add-restaurant-container">
                        {errors.map((error, ind) => (
                        <div className="each-error" key={ind}>
                            <h4>*{error}*</h4>
                        </div>
                        ))}
                    </div>
                    <div className="add-restaurant-container">
                        <label htmlFor="restaurant-namrgb(166,166,166)">Restaurant Name</label>
                        <p>Zen Garden</p>
                        <input
                            className="restaurant-name-input"
                            name="restaurant-name"
                            type="text"
                            value={restaurantName}
                            onChange={updateRestaurantName}
                            maxLength="30"
                        />
                    </div>
                    <div className="add-restaurant-container">
                        <label className="location" htmlFor="location">Location</label>
                        <p>ex. 1914 Fillmore St San Francisco, CA</p>
                        <input
                            className="location-input"
                            name="location"
                            type="text"
                            value={location}
                            onChange={updateLocation}
                            maxLength="50"
                        />
                    </div>
                    <div className="add-restaurant-container">
                        <label className="phone-number-label" htmlFor="phone-number">Phone Number</label>
                        <p>ex. 789561234</p>
                        <input
                            className="phone-number-input"
                            name="phone-number"
                            type="text"
                            value={phoneNumber}
                            onChange={updatePhoneNumber}
                            maxLength="10"
                        />
                    </div>
                    <div className="add-restaurant-container">
                        <label className="img-label" htmlFor="img-src">Image Url</label>
                        <input
                            className="img-src-input"
                            name="img-src"
                            type="text"
                            value={imgSrc}
                            onChange={updateImg}
                        />
                    </div>
                    <div className="add-restaurant-lower">
                        <button className="add-restaurant-submit-btn" type="submit" onClick={(e)=>addRestaurant(e)}>
                            <h4 id="add-restaurant-btn">Add New Item</h4>
                        </button>
                        <NavLink exact to="/" id="home-link">Cancel</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRestauntPage;
