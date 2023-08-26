import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { starRatingResults } from '../Utils/DisplayStarRating';
import { saveCurrentPage } from '../../store/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const containerStyle = {
	width: '100%',
	height: '100%',
	backgroundColor: '#D3D3D3',
};

function ResultsMap({ restaurantLocations, location }) {

  const dispatch = useDispatch();
  const history = useHistory();

	const mapRef = useRef(null);
	const overlayRefs = useRef([]);
	const resultLocationRefs = useRef({});
	const iconRefs = useRef({});
	const infoBoxRef = useRef(null);
	const phantomBoxRef = useRef(null); // For invisible box to cover both infoBox and icon

	const [currentIdx, setCurrentIdx] = useState(null);

	console.log('restaurant locations == ',restaurantLocations)
	// Ensure that all markers are visable within the map's viewport
	useEffect(() => {
		if (mapRef.current) {
			const bounds = new window.google.maps.LatLngBounds();
			restaurantLocations.forEach((res) => {
				bounds.extend(res.coordinates);
			});
			mapRef.current.fitBounds(bounds);
		}
	}, [mapRef, restaurantLocations]);

	// Show/Hide infoBox depending on current idx
	// Adjust position of infoBox depending of position of marker
	useEffect(() => {

		const phantomBox = phantomBoxRef.current;
		const icons = iconRefs.current;
		const currentIcon = icons ? icons[currentIdx] : null;
		const infoDiv = infoBoxRef.current;
		const currentLoc = resultLocationRefs.current;
		const currentLocation = currentLoc[currentIdx]
			? currentLoc[currentIdx].getBoundingClientRect()
			: 'null';
		const windowWidth = window.innerWidth;

		// Hide both phantomBox and infoDiv
		if (!currentIdx && phantomBox) phantomBox.style.display = 'none';
		if (!currentIdx && infoDiv) infoDiv.style.display = 'none';


		// Change colorscheme based on icon selection
		// if (currentIcon) {
		// 	if (currentIdx === null || currentIdx === undefined) {
		// 		currentIcon?.classList.remove('result-icon-selected');
		// 		currentIcon?.classList.add('result-icon');
		// 	} else {
		// 		currentIcon.classList.remove('result-icon')
		// 		currentIcon.classList.add('result-icon-selected')
		// 	}
		// }


		// If there's not enough space above the marker for info Box,
		// show below infoBox and phantomBox BELOW marker
		if (currentLocation.top < 380) {
			console.log('inside flipped')
			if (infoDiv.classList.contains('infoBox')) {
				infoDiv.classList.remove('infoBox');
				infoDiv.classList.add('infoBoxFlipped');
			}

			if (phantomBox.classList.contains('phantom-result-container')) {
				phantomBox.classList.remove('phantom-result-container');
				phantomBox.classList.add('phantom-result-container-flipped')
			}

			infoDiv.style.top = currentLocation.bottom - 69 + 'px';
			infoDiv.style.right = windowWidth - currentLocation.right - 50 + 'px';
			phantomBox.style.top = -5 + 'px';
			phantomBox.style.right = 0 + 'px';

			infoDiv.style.display = 'flex';						// Show both infoDiv and phantomBox
			phantomBox.style.display = 'flex';
		}

		// If there's enough space above the marker for info Box,
		// show infoBox and phantomBox ABOVE marker
		if (currentLocation.top > 380) {
			console.log('inside upright')
			if (infoDiv.classList.contains('infoBoxFlipped')) {
				infoDiv.classList.remove('infoBoxFlipped');
				infoDiv.classList.add('infoBox');
			}

			if (phantomBox.classList.contains('phantom-result-container-flipped')) {
				phantomBox.classList.remove('phantom-result-container');
				phantomBox.classList.add('phantom-result-container')
			}

			infoDiv.style.top = currentLocation.top - 378 + 'px';
			infoDiv.style.right = windowWidth - currentLocation.right - 50 + 'px';
			phantomBox.style.top = 0 + 'px';
			phantomBox.style.right = 0 + 'px';

			infoDiv.style.display = 'flex';					// Show both infoDiv and phantomBox
			phantomBox.style.display = 'flex';
		}
	}, [currentIdx]);

	const sendToRestaurant = (restaurant) => {
    dispatch(saveCurrentPage('other'));
		history.push(`/restaurants/${restaurant.id}`);
  };

	// Set current idx
	const highlight = (i) => {
		console.log('highlight current idx ', i)
		setCurrentIdx(i);
	};

	// Set current idx to null
	const hide = () => {
		setCurrentIdx(null);
	};


	// Render InfoBox
	const renderInfoBox = (i) => {
		const restaurantLocation = restaurantLocations[i];
		const starRating = starRatingResults(
			restaurantLocation?.restaurant?.rating
		);

		if (currentIdx !== null) {
			return (
				<div
						className='result-restaurant-map-info-card-overlay'
						type='button'
						onClick={(e) => sendToRestaurant(restaurantLocations[i].restaurant)}>
						<img
							className='result-restaurant-map-info-img-overlay'
							src={restaurantLocation.restaurant?.imgSrc}
							alt='Restaurant Image'
						/>
						<h2>{restaurantLocation.restaurant?.name}</h2>
						<div className='results-restaurant-map-info-rating-overlay'>
							<div className='phantom-result-container'
								ref={phantomBoxRef}
								onMouseOver={() => highlight(i)}
								onMouseOut={() => hide()}>
							</div>
							{starRating}
							<p>{restaurantLocation.restaurant.rating}</p>
						</div>
					</div>
			);
		}
	};

	// Create advance marker for map
	const AdvancedMarkerElement = (locationObj, i) => {
		const overlayViewPosition = {
			lat: locationObj.coordinates.lat,
			lng: locationObj.coordinates.lng,
		};

		return (
			<OverlayView
				position={overlayViewPosition}
				mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
				key={`overlay-${i}`}
				onLoad={(overlay) => overlayRefs.current.push(overlay)}>
				<div
					className={`result-location-container-${i}`}
					key={`result-location-container-key-${i}`}
					onMouseOver={() => highlight(i)}
					ref={(el) => resultLocationRefs.current[i] = el}
          onClick={e=> sendToRestaurant(locationObj.restaurant)}>
					<div
						className={`result-icon `}
						key={`result-icon-key-${i}`}
						type='button'
						ref={(el) => (iconRefs.current[i] = el)}>
						<p>{i + 1}</p>
					</div>
				</div>
			</OverlayView>
		);
	};

	const mapOptions = {
		disableDefaultUI: true,
		mapId: 'ff8dbb61c8194218',
		draggable: true,
		scrollwheel: true,
		zoomControl: true,
		zoomControlOptions: {
			position: window.google.maps.ControlPosition.RIGHT_TOP,
		},
		fullscreenControl: true,
		fullscreenControlOptions: {
			position: window.google.maps.ControlPosition.TOP_RIGHT,
		},
	};

	return (
		<>
			<div className='infoBox' ref={infoBoxRef}>
				{renderInfoBox(currentIdx)}
			</div>
			<GoogleMap
				mapContainerStyle={containerStyle}
				zoom={11}
				options={mapOptions}
				onLoad={(map) => mapRef.current = map}>
				{restaurantLocations.length &&
					restaurantLocations.map((res, i) => AdvancedMarkerElement(res, i))}
			</GoogleMap>
		</>
	);
}

export default React.memo(ResultsMap);
