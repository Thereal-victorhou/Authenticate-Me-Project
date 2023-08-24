import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { infoRating } from '../Utils/DisplayStarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const containerStyle = {
	width: '100%',
	height: '100%',
};

function ResultsMap({ searchResults, location }) {
	// Create array of locations
	const restaurantLocations = [];
	if (searchResults)
		searchResults.forEach((res) => {
			restaurantLocations.push({
				coordinates: {
					lat: Number(res.coordinates[0]),
					lng: Number(res.coordinates[1]),
				},
				title: `${res.name}`,
				restaurant: res,
			});
		});

	const mapRef = useRef(null);
	const overlayRefs = useRef([]);
  const infoBoxRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(null);

	const center = {
		lat: location.lat,
		lng: location.lng,
	};

	// Ensure that all overlays are visable within the map's viewport
	useEffect(() => {
		if (mapRef.current) {
			const bounds = new window.google.maps.LatLngBounds();
			restaurantLocations.forEach((res) => {
				bounds.extend(res.coordinates);
			});
			mapRef.current.fitBounds(bounds);
		}
	}, [mapRef, restaurantLocations, overlayRefs]);

  // Show info window
	const highlight = (restaurant, i) => {

	};

  // Hide info window
	const hide = (restaurant, i) => {

  };

  // Render box

	const AdvancedMarkerElement = (restaurant, i) => {
		const overlayViewPosition = {
			lat: restaurant.coordinates.lat,
			lng: restaurant.coordinates.lng,
		};

		return (
			<OverlayView
				position={overlayViewPosition}
				mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
				key={`overlay-${i}`}>
				<div
					onMouseOver={() => highlight(restaurant, i)}
					onMouseOut={() => hide(restaurant, i)}
				>
					<div className={`result-icon icon-${i + 1}`} type='button'>
						<p>{i + 1}</p>
					</div>
				</div>
			</OverlayView>
		);
	};

	const mapOptions = {
		disableDefaultUI: true,
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
	 		<div id='infoBox' className='hidden' ref={infoBoxRef}>

      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        // center={center}
        zoom={11}
        mapId='ff8dbb61c8194218'
        options={mapOptions}
        onLoad={(map) => (mapRef.current = map)}>
        {restaurantLocations.length &&
          restaurantLocations.map((res, i) => AdvancedMarkerElement(res, i))}
      </GoogleMap>
    </>
	);

	// async function initMap() {
	// 	// The location of Uluru
	// 	const center = { lat: location.lat, lng: location.lng };
	// 	// Request needed libraries.
	// 	const { Map, MapTypeId } = await window.google.maps.importLibrary('maps');
	// 	const { ControlPosition } = await window.google.maps.importLibrary('core');
	// 	const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
	// 		'marker'
	// 	);
	// 	const bounds = new window.google.maps.LatLngBounds();

	// 	// The map, centered at selected location
	// 	map = new Map(document.getElementById('map'), {
	// 		zoom: 8,
	// 		mapId: 'ff8dbb61c8194218',
	// 		// mapTypeId: window.google.maps.MapTypeId.R,
	// 		disableDefaultUI: true,
	// 		fullscreenControl: true,
	// 		fullscreenControlOptions: {
	// 			position: window.google.maps.ControlPosition.TOP_RIGHT,
	// 		},
	// 		zoomControl: true,
	// 		zoomControlOptions: {
	// 			position: window.google.maps.ControlPosition.RIGHT_TOP,
	// 		},
	// 	});

	// 	const restaurantLocations = [];

	// 	if (searchResults)
	// 		searchResults.forEach((res) => {
	// 			restaurantLocations.push({
	// 				coordinates: {
	// 					lat: Number(res.coordinates[0]),
	// 					lng: Number(res.coordinates[1]),
	// 				},
	// 				title: `${res.name}`,
	// 				restaurant: res,
	// 			});
	// 		});

	// 	// Create markers and in glyphs to them
	// 	const addMarkers = (locationObj, i) => {
	// 		let marker = new window.google.maps.marker.AdvancedMarkerElement({
	// 			map: map,
	// 			position: locationObj.coordinates,
	// 			title: locationObj.title,
	// 			content: buildContent(locationObj.restaurant, i),
	// 		});

	//     // Listen for clicks on markers to show info window
	//     const clickListener = marker.addListener('click', ({domEvent, latLng}) => {
	//       const { target } = domEvent;

	//       // showInfoBox(target, locationObj.restaurant, locationObj.coordinates);
	//       toggleHighlight(marker)
	//     });

	// 		window.google.maps.event.addListener(marker,
	//       'mouseover',
	// 			function({ domEvent, latLng }){
	//         const { target } = domEvent;
	// 			  // showInfoBox(target, locationObj.restaurant, locationObj.coordinates);
	// 			  toggleHighlight(marker)

	// 				console.log('inside hover ==== ', target);
	// 				// window.google.maps.event.removeListener(hoverListener);
	// 			}
	//     );

	// 		bounds.extend(marker.position);
	// 	};

	// 	for (let i = 0; i < restaurantLocations.length; i++) {
	// 		addMarkers(restaurantLocations[i], i);
	// 	}

	//   // Hide and Show info box
	// 	function toggleHighlight(markerView) {
	// 		if (markerView.content.classList.contains('highlight')) {
	// 			markerView.content.classList.remove('highlight');
	// 			markerView.zIndex = null;
	// 			console.log('remove highlight');
	// 		} else {
	// 			markerView.content.classList.add('highlight');
	// 			markerView.zIndex = 10;
	// 			console.log('add highlight');
	// 		}
	// 	}

	// 	// create marker
	// 	function buildContent(restaurant, i) {
	// 		const content = document.createElement('div');
	// 		content.classList.add('property');
	// 		content.innerHTML = `
	//       <div class='result-icon icon-${i + 1}' type='button'>
	//         <p>${i + 1}</p>
	//       </div>
	//       <div class="result-restaurant-map-info-card" type='button'>
	//         <img class='result-restaurant-map-info-img' src='${
	// 					restaurant.imgSrc
	// 				}' alt='Restaurant Image'/>
	//         <h2>${restaurant.name}</h2>
	//         <div class='results-restaurant-map-info-rating'>
	//           ${infoRating[restaurant.rating]}
	//           <p>${restaurant.rating}</p>
	//       </div>
	//       `;
	// 		return content;
	// 	}

	// 	// TODO comeback to later to figure out how to create a floating info window that can overlap maps
	// 	// create info window
	// 	function showInfoBox(target, restaurant, coordinates) {
	//     const rect = target.getBoundingClientRect();
	// 		let infoBox = document.getElementById('infoBox');
	// 		// let scale = Math.pow(2, map.getZoom());
	// 		// let nw = new window.google.maps.LatLng(
	// 		//   map.getBounds().getNorthEast().lat(),
	// 		//   map.getBounds().getSouthWest().lng()
	// 		//   );
	// 		//   console.log(nw)
	// 		// let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw)
	// 		// let worldCoordinate = map.getProjection().fromLatLngToPoint(coordinates);
	// 		// let pixelOffset = new window.google.maps.Point(Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale), Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale));
	// 		// infoBox.style.left = pixelOffset.x + 'px';

	//     // Position the infoBox to the left of the target
	//     // infoBox.style.top = (rect.top + window.scrollY) + 'px';
	//     // infoBox.style.left = (rect.left - infoBox.offsetWidth) + 'px';
	//     console.log('style right ===', (rect.right - infoBox.offsetWidth) -500)
	//     console.log('target ===',rect)
	//     console.log('window height === ', window.innerHeight)
	//     console.log('window width ====== ', window.innerWidth)
	// 		infoBox.style.display = 'flex';
	//     infoBox.style.top = (rect.top + window.scrollY + (rect.height / 2) - (infoBox.offsetHeight / 2)) + 'px';
	//     // infoBox.style.left = (rect.left - infoBox.offsetWidth) + 'px';
	// 		infoBox.innerHTML = `
	//       <div class="result-restaurant-map-info-card-overlay" type='button'>
	//         <img class='result-restaurant-map-info-img-overlay' src='${
	// 					restaurant.imgSrc
	// 				}' alt='Restaurant Image'/>
	//         <h2>${restaurant.name}</h2>
	//         <div class='results-restaurant-map-info-rating-overlay'>
	//           ${infoRating[restaurant.rating]}
	//           <p>${restaurant.rating}</p>
	//       </div>
	//     `;
	// 	}

	// 	map.fitBounds(bounds);
	// }

	// initMap();

	// if (!searchResults.length)
	// 	return (
	// 		<>
	// 			<div id='results-map-loading'>
	// 				<FontAwesomeIcon
	// 					icon={faCircleNotch}
	// 					spin
	// 					size='2xl'
	// 					style={{ color: '#8c8c8c' }}
	// 				/>
	// 			</div>
	// 		</>
	// 	);

	// return (
	// 	<>
	// 		<div id='infoBox' className='hidden'></div>
	// 		<div className='search-results-map' id='map'></div>
	// 	</>
	// );
}

export default React.memo(ResultsMap);
