import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from 'react-places-autocomplete';
import './LocationSearchInput.css';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
});

function LocationSearchInput() {
	const [address, setAddress] = useState('');
	const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
	const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [firstOption, setFirstOption] = useState('');
  const [isSelected, setIsSelected] = useState(false);

	const inputLength = document
		.querySelector('search-bar-location')
		?.getAttribute('values')?.length;

  let locationPlaceholder = document.getElementsByName('location')[0]?.placeholder;


	const handleSelect = async (value) => {
    console.log(value)
		const result = await geocodeByAddress(address);
		const ll = await getLatLng(result[0]);
		console.log(ll);
		setAddress(value);
		setCoordinates(ll);
	};

  const handled = () => {
    console.log('hello')
  }

	// Get User Location -> Set User Location
	const handleCurrentLocation = (e) => {
		e.preventDefault();
	};

  const handleInputSelection = (e) => {
    e.preventDefault();
    setIsSelected(true)
  }

	const updateResults = () => {
		return (
			<>
				{suggestedLocations.map((suggestion) => {
					return (
						<div
							className='location-suggestions'
							id={suggestion.placeId}
							value={address}>
							<span>{suggestion.description}</span>
						</div>
					);
				})}
			</>
		);
	};

	const searchOptions = {
    language: 'en',
		types: ['(cities)'],
    country: ["us", "pr", "vi", "gu", "mp"],
	};

  // Render suggestions in input bar
	useEffect(() => {
		// updateResults();
    setFirstOption(suggestedLocations[0]?.description)
    locationPlaceholder = `${firstOption ? `${firstOption}`: 'address, city, state'}`
	}, [suggestedLocations]);


	return (
		<>
			<PlacesAutocomplete
				value={address}
				onChange={setAddress}
				onSelect={handleSelect}
				searchOptions={searchOptions}>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div className='location-search-container'>
						<input
							name='location'
              onClick={handleInputSelection}
							{...getInputProps({
								placeholder: 'address, city, state',
								className: 'search-bar-location',
							})}
						/>
            {/* <div className='search-bar-location-placeholder'>{firstOption}</div> */}
						<div className='location-search-results-container'>
							<div
								className='current-location-container'
								onSelect={(e) => handleCurrentLocation(e)}>
								<PlaceOutlinedIcon
									id='location-icon'
									sx={{
										color: '#038aff',
									}}
								/>
								<p>Current Location</p>
							</div>
							{loading && <div>Loading...</div>}
							{/* {updateResults()} */}
              {suggestions.map((suggestion) => {
                return (
                  <div
                    className='location-suggestions'
                    id={suggestion.placeId}
                    value={address}>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		</>
	);
}

export default LocationSearchInput;
