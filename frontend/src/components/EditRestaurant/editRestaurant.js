import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { oneRestaurant, editRestaurant } from '../../store/restaurant';

const EditRestaurantPage = ({ user }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const currentRestaurant = useSelector(state => Object.values(state.restaurant));


    const [errors, setErrors] = useState([]);
    const { id } = useParams();
    const [restaurantName, setRestaurantName] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [imgSrc, setImgSrc] = useState("")
    const [restaurantId, setRestaurantId] = useState(0)

    useEffect(()=>{
        dispatch(oneRestaurant(id))
    }, [dispatch, id])

    useEffect(() => {

        if (currentRestaurant) {
            setRestaurantName(currentRestaurant[0]?.name)
            setLocation(currentRestaurant[0]?.location)
            setPhoneNumber(currentRestaurant[0]?.phoneNumber)
            setImgSrc(currentRestaurant[0]?.imgSrc)
            setRestaurantId(id)
        }
    }, [])


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

    const editOneRestaurant = (e) => {
        e.preventDefault()
        setErrors([])

        if (restaurantName, location, phoneNumber, imgSrc) {

            return dispatch(editRestaurant({
                name: restaurantName,
                location: location,
                phoneNumber: phoneNumber,
                imgSrc: imgSrc,
                restaurantId: restaurantId,
                // userId: user.id
            }))?.catch(async (res) => {
                if (res.status === 400) {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    return
                }

            })
            .then(()=> alert('Restaurant information has been updated.'))
            .then(() => history.push(`/restaurants/${id}`))

        }
        return setErrors(['Please complete form before submitting.'])
    };

    return (
        <div className="edit-restaurant-main">
            <div className='edit-restaurant-title'>
                <h1>Edit Restaurant</h1>
            </div>
            <div className='edit-restaurant-mid'>
                <form className="edit-restaurant-form">
                    <div className="edit-restaurant-container">
                        {errors.map((error, ind) => (
                        <div className="each-error" key={ind}>
                            <h4>*{error}*</h4>
                        </div>
                        ))}
                    </div>
                    <div className="edit-restaurant-container">
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
                    <div className="edit-restaurant-container">
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
                    <div className="edit-restaurant-container">
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
                    <div className="edit-restaurant-container">
                        <label className="img-label" htmlFor="img-src">Image Url</label>
                        <input
                            className="img-src-input"
                            name="img-src"
                            type="text"
                            value={imgSrc}
                            onChange={updateImg}
                        />
                    </div>
                    <div className="edit-restaurant-lower">
                        <button className="edit-restaurant-submit-btn" type="submit" onClick={(e)=>editOneRestaurant(e)}>
                            <h4 id="edit-restaurant-btn">Submit Changes</h4>
                        </button>
                        <NavLink exact to={`/restaurants/${restaurantId}`} id="home-link">Cancel</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditRestaurantPage;
