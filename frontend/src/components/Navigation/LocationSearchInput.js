import React, { useEffect, useState, useRef} from 'react';
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

function LocationSearchInput({ pageType }) {

  const inputRef = useRef();
  const suggestionRef = useRef();

	const [address, setAddress] = useState('');
	const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
	const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [firstOption, setFirstOption] = useState('');
  const [selectInput, setSelectInput] = useState('false');
  const [selectSuggestion, setSelectSuggestion] = useState();
	const inputLength = document.getElementsByName('location-input')[0]?.value?.length;


  // Leave here to set up autocomplete input box
  let locationPlaceholder = document.getElementsByName('location-input')[0]?.placeholder;


	const handleSelect = async (value) => {

		const result = await geocodeByAddress(address);
		const ll = await getLatLng(result[0]);
		console.log(ll);
		setAddress(value);
		setCoordinates(ll);
	};

	// Get User Location -> Set User Location
	const handleCurrentLocation = (e) => {
    e.preventDefault()

	};

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

  // Close location results
  useEffect( async () => {
    if ( selectInput === true && inputLength > 0) {
      await document.querySelector('.location-search-results-container')?.classList.remove('hide');
    }
    else {
      await document.querySelector('.location-search-results-container')?.classList.add('hide');
    }
  }, [selectInput, inputLength]);

  // Determine if location input box was selected
  useEffect(() => {
    window.onclick = (event) => {
      if (event.target.contains(inputRef.current)
        && event.target !== inputRef.current) {
        setSelectInput(false);
      } else {
        setSelectInput(true);
      }
    }
  },[])

  // Switch styling for location input based on page
  useEffect( async () => {
    console.log(pageType)
    if (pageType === 'home') {
      await document.querySelector('.search-bar-location')?.classList.remove('other');
    }else {
      await document.querySelector('.search-bar-location')?.classList.add('other');
    }
  },[pageType])

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
							name='location-input'
              ref={inputRef}
							{...getInputProps({
								placeholder: 'address, city, state',
								className: 'search-bar-location',
							})}
						/>
            {/* <div className='search-bar-location-placeholder'>{firstOption}</div> */}
						<div className='location-search-results-container'>
							<div
								className='current-location-container'
								onClick={() => handleCurrentLocation}
                >
								<PlaceOutlinedIcon
									id='location-icon'
									sx={{
										color: '#038aff',
									}}
								/>
								<p>Current Location</p>
							</div>
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
