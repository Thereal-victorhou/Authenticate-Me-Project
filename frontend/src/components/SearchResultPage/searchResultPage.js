import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import ResultsMap from './resultsMap';
import { getSearchResults } from '../../store/searchResult';
import { saveCurrentPage } from '../../store/navigation';
import { formatCategory } from '../Utils/FormatCategories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { starRatingResults } from '../Utils/DisplayStarRating';

const SearchResultPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const searchRes = useSelector((state) => Object.values(state.searchResults));
	const location = useSelector((state) => state.location);

	const search = useLocation().search;
	const find = new URLSearchParams(search).get('find_desc');


	const restaurantLocations = [];
	// Create array of locations
	if (searchRes)
		searchRes.forEach((res) => {
			restaurantLocations.push({
				coordinates: {
					lat: Number(res.coordinates[0]),
					lng: Number(res.coordinates[1]),
				},
				title: `${res.name}`,
				restaurant: res,
			});
		});

	const getOneRestaurant = async (e, resId) => {
		e.preventDefault();

		dispatch(saveCurrentPage('other'));
		history.push(`/restaurants/${resId}`);
	};

	const isResults = () => {
		if (searchRes.length) {
			return (
				<>
					<div className='results-page-title'>
						<h2>
							{`Top ${searchRes.length} Best ${find} Near ${location?.location}`}
							:
						</h2>
					</div>
					<ul id='search-results-page-list'>
						{searchRes.map((res, i) => {
							return (
								<li
									className='search-results-page-restaurant-container'
									key={searchRes.indexOf(res)}>
									<div
										className={'results-page-restaurant-container'}
										type='button'>
										<img
											className={'results-restaurant-photo'}
											src={res.imgSrc}
											alt={'Restaurant Image'}></img>
										<div className={'results-restaurant-info'}>
											<div
												className='results-restaurant-info-container'
												onClick={(e) => getOneRestaurant(e, res.id)}>
												<h2 className='results-restaurant-name'>{`${i + 1}. ${
													res.name
												}`}</h2>
												<div className='restaurant-ratings-container'>
													{starRatingResults(res.rating)}
													<p>{res.rating}</p>
												</div>
												<div className='results-restaurant-categories-container'>
													{res.categories.map((category) => (
														<div>
															<p>{`${formatCategory(category)}`}</p>
														</div>
													))}
													<p>{res.price}</p>
												</div>
												<div className='results-restaurant-location'>
													<p>{res.location[0]}</p>
												</div>
												<div className='results-restaurant-review-container'>
													{res.review !== undefined ?
													<>
														<span>
															<FontAwesomeIcon
																icon={faMessage}
																size='sm'
																style={{ color: '#696969' }}
															/>
														</span>
														<div className='results-review-body'>
															<p>{`"${res.review.body}"`}</p>
														</div>
													</>
													: ''}
												</div>
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</>
			);
		} else {
			return (
				<div className='results-not-found'>
					<h2>{`Could not find results for ${find}`}</h2>
					<div className='no-results-suggestions'>
						<h5>Suggestions for in improving your results:</h5>
						<li>Try a different location</li>
						<li>Check the spelling or try alternate spellings</li>
					</div>
				</div>
			);
		}
	};

	return (
		<div className='search-results-page-main'>
			<div className='search-results-page-container'>
				{searchRes && isResults()}
			</div>
			<div className='search-results-map-container'>
				<div>
					<ResultsMap restaurantLocations={restaurantLocations} location={location}/>
				</div>
			</div>
		</div>
	);
};

export default SearchResultPage;
