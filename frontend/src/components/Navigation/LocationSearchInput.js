import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LoadScript } from '@react-google-maps/api';
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from 'react-places-autocomplete';
import {
	searchOptions,
	abbreviateState,
	validateSuggestions,
	handleSuggestionDescriptionBasedOnType,
} from '../Utils/LocationValidation';
import { saveLocation } from '../../store/location';
import { v4 as uuidv4 } from 'uuid';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import './LocationSearchInput.css';

const theme = createTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
});

function LocationSearchInput({ inputSelection, sessionToken, handleUpdateLocation }) {

	const dispatch = useDispatch();
	const [address, setAddress] = useState(``);
	const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
	const [suggestedLocations, setSuggestedLocations] = useState([]);
	const [firstOption, setFirstOption] = useState('');
	const [field, setField] = useState('');
	const [location, setLocation] = useState('');

	const pageType = useSelector(
		(state) => state.navigation?.action?.currentPage
	);

	// Leave here to set up autocomplete placeholder input box
	let locationPlaceholder =
		document.getElementsByName('location-input')[0]?.placeholder;

	// Set and Save Location
	const handleSelect = async (value) => {
		console.log('value ', value)

			let removeCountry = value.replace(/USA/, '')

			const lastIndex = removeCountry.lastIndexOf(',');
			if (lastIndex > -1) {
				removeCountry = removeCountry.substring(0, lastIndex)
			}

			setAddress(removeCountry);
			setLocation(removeCountry);

			try {
				const result = await geocodeByAddress(value);
				const ll = await getLatLng(result[0]);

				/* TODO: Create error handling for before calling handleUpdateLocation */
				const locationObj = { location: removeCountry, ...ll};
				dispatch(saveLocation(locationObj));
				handleUpdateLocation(locationObj);
				setCoordinates(ll);

			} catch(err) {
				console.log(`Error: ${err.message}`)
			}
	};

	// Get User Location -> Set User Location
	const handleCurrentLocation = async (e) => {
		// TODO: Create function to get user location
		return alert('Feature in Development! Please enter your location and select from the drop down.');

		if (e) e.preventDefault();
		// Find an alternate way of getting user location
		const response = await fetch('http://ip-api.com/json', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		console.log(result)
		if (result.status === 'success') {
      const location = `${result.city}, ${abbreviateState(result.regionName)}, USA`;
      handleSelect(location)
		} else {
			alert(
				'Location Services Error. Please search for your preferred location.'
			);
		}
	};

	// Generate 1 session token
	const generateSessionToken = () => {
		return uuidv4();
	};

	// Handle autocomplete error
	const onError = (status, clearSuggestions) => {
		console.log('Google Maps API returned error with status: ', status);
		clearSuggestions();
	};

	// Render suggestions in input bar
	useEffect(() => {
		// updateResults();
		setFirstOption(suggestedLocations[0]?.description);
		locationPlaceholder = `${
			firstOption ? `${firstOption}` : 'address, city, state or zip'
		}`;
	}, [suggestedLocations]);

	// hide/show location results
	useEffect(async () => {
		if (inputSelection === true) {
			await document
				.querySelector('.location-search-results-container')
				?.classList.remove('hide');
		} else {
			await document
				.querySelector('.location-search-results-container')
				?.classList.add('hide');
		}

		if (inputSelection === true && pageType === 'other')
			await document
				.querySelector('.search-bar-location.other')
				?.classList.add('live');
		else
			await document
				.querySelector('.search-bar-location.other')
				?.classList.remove('live');
	}, [pageType, inputSelection]);


	// Switch styling for location input based on page
	useEffect(async () => {
		if (pageType === 'home') {
			await document
				.querySelector('.search-bar-location')
				?.classList.remove('other');
		} else {
			await document
				.querySelector('.search-bar-location')
				?.classList.add('other');
		}
	}, [pageType]);

		return (
			<>
					<PlacesAutocomplete
						value={address}
						onChange={setAddress}
						onSelect={(e) => handleSelect(e)}
						onError={onError}
						searchOptions={searchOptions(address)}>
						{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
							<div className='location-search-container'>
								<input
									name='location-input'
									{...getInputProps({
										placeholder: 'address, city, state or zip',
										className: 'search-bar-location',
									})}
								/>
								{/* <div className='search-bar-location-placeholder'>{firstOption}</div> */}
								<div className='location-search-results-container'>
									<div
										className='current-location-container'
										onClick={(e) => handleCurrentLocation(e)}>
										<PlaceOutlinedIcon
											id='location-icon'
											sx={{
												color: '#038aff',
											}}
										/>
										<p>Current Location</p>
									</div>
									{/* {loading && <div>Loading...</div>} */}
									{validateSuggestions(suggestions).map((suggestion) => {
										const className = suggestion.active
											? 'suggession-item--active'
											: 'suggestion-item';
										const key = suggestion.description;

										return (
											<div
												{...getSuggestionItemProps(suggestion, { className, key })}
												name='location-suggestion'
												className='location-suggestions'
												value={suggestion.description}>
												<span>
													{
														handleSuggestionDescriptionBasedOnType(suggestion)
															.description
													}
												</span>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</PlacesAutocomplete>
			</>
		)




}

export default LocationSearchInput;
