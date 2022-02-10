import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import { oneRestaurant } from '../../store/restaurant';
import { liveSearch, clearSearch } from '../../store/search';
const queryString = require('query-string');


const SearchResultPage = () => {

    // const parsed = queryString.parse(params.location.search);
    // const search = props.location.search;
    // const params = new URLSearchParams(search);
    // const find = params.get('find');

    const searchRes = useSelector(state => Object.values(state.search))
    const dispatch = useDispatch();
    const history = useHistory();

    const search = useLocation().search;
    const find = new URLSearchParams(search).get('find');

    const rerouting = async (e) => {

    }

    const isResults = () => {
        if (searchRes.length) {
            return (
                <>
                    <div>
                        <h2>{`Results for ${find}`}</h2>
                    </div>
                    <ul id='card-list'>
                        {searchRes.map((res) => {
                            return (
                                <li className="restaurant-container" key={searchRes.indexOf(res)}>
                                    <div className={'restaurant_container'}>
                                        <img className={'restaurant-photo'} src={res.imgSrc} alt={"Restaurant Image"}></img>
                                        <div className={'restaurant-info'}>
                                            <NavLink className='name-and-location-container' onClick={(e) => dispatch(oneRestaurant(res.id)).then(() => dispatch(clearSearch()))} to={`/restaurants/${res.id}`}>
                                                    <h2 className='restaurant-name'>{res.name}</h2>
                                                <div className="restaurant-location-container">
                                                    {res.location}
                                                </div>
                                            </NavLink>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )
        } else {
            <div>
                <h2>{`Could not find results for ${find}`}</h2>
            </div>
        }
    }

    return (
        <div className="all-restaurants-container">
            {searchRes && isResults()}
        </div>
    )
}

export default SearchResultPage;
