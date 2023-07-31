import React, { useEffect, useState, useRef} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from 'react-places-autocomplete';
import searchOptions from '../Utils/LocationValidation';
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

function LocationSearchInput({ pageType }) {

  const inputRef = useRef();
  const suggestionRef = useRef();

	const [address, setAddress] = useState('');
	const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
	const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [firstOption, setFirstOption] = useState('');
  const [selectInput, setSelectInput] = useState(false);
  const [selectSuggestion, setSelectSuggestion] = useState();
	const [location, setLocation] = useState('');
  const [sessionToken, setSessionToken] = useState({ sessionToken: null });

	const inputValue = document.getElementsByName('location-input')[0]?.value;

  // Leave here to set up autocomplete placeholder input box
  let locationPlaceholder = document.getElementsByName('location-input')[0]?.placeholder;


	const handleSelect = async (value) => {
    setAddress(value);
    setLocation(value);
    return;
		const result = await geocodeByAddress(address);
		const ll = await getLatLng(result[0]);

		console.log('ll: ',ll);
		setAddress(value);
		setCoordinates(ll);
	};

	// Get User Location -> Set User Location
	const handleCurrentLocation = (e) => {
    e.preventDefault()

	};

  // Generate 1 session token
  const generateSessionToken = () => {
    return uuidv4();
  }

  // Render suggestions in input bar
	useEffect(() => {
		// updateResults();
    setFirstOption(suggestedLocations[0]?.description)
    locationPlaceholder = `${firstOption ? `${firstOption}`: 'address, city, state or zip'}`
	}, [suggestedLocations]);

  // Close location results
  useEffect( async () => {
    if ( selectInput === true ) {
      await document.querySelector('.location-search-results-container')?.classList.remove('hide');
    }
    else {
      await document.querySelector('.location-search-results-container')?.classList.add('hide');
    }
  }, [selectInput]);


  // Determine if location input box and which location was selected
  useEffect(() => {
    window.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.target.contains(inputRef.current)
        && event.target !== inputRef.current) {
        setSelectInput(false);
        console.log('false')
      } else {
        setSelectInput(true);
        console.log('true')
      }

      // if (event.target.contains(suggestionRef.current)
      //   && event.target !== suggestionRef.current) {
      //   setLocation('');
      //   console.log('nothing')
      // } else {
      //   setLocation(event.target.innerText);
      //   setAddress(event.target.innerText);
      //   console.log('everything')
      //   // document.querySelector('.location-search-results-container')?.classList.add('hide');
      //   // setSelectInput(false)
      // }
    }

  },[])


  // Switch styling for location input based on page
  useEffect( async () => {
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
				onSelect={(e)=>handleSelect(e)}
				searchOptions={searchOptions(address)}>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div className='location-search-container'>
						<input
							name='location-input'
              ref={inputRef}
							{...getInputProps({
								placeholder: 'address, city, state or zip',
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
                const className = suggestion.active ? 'suggession-item--active' : 'suggestion-item';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { className })}
                    name='location-suggestion'
                    className='location-suggestions'
                    id={suggestion.placeId}
                    value={suggestion.description}>
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
