import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { infoRating } from '../Utils/DisplayStarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function ResultsMap({ searchResults, location }) {
	let map;

	async function initMap() {
		// The location of Uluru
		const center = { lat: location.lat, lng: location.lng };
		// Request needed libraries.
		//@ts-ignore
		const { Map, MapTypeId } = await window.google.maps.importLibrary('maps');
		const { ControlPosition } = await window.google.maps.importLibrary('core');
		const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
			'marker'
		);
		const bounds = new window.google.maps.LatLngBounds();

		// The map, centered at selected location
		map = new Map(document.getElementById('map'), {
			zoom: 8,
			mapId: 'ff8dbb61c8194218',
			// mapTypeId: window.google.maps.MapTypeId.R,
			disableDefaultUI: true,
			fullscreenControl: true,
			fullscreenControlOptions: {
				position: window.google.maps.ControlPosition.TOP_RIGHT,
			},
			zoomControl: true,
			zoomControlOptions: {
				position: window.google.maps.ControlPosition.RIGHT_TOP,
			},
		});

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

		// Create markers and in glyphs to them
		const addMarkers = (locationObj, i) => {
			const marker = new window.google.maps.marker.AdvancedMarkerElement({
				map: map,
				position: locationObj.coordinates,
				// title: locationObj.title,
				content: buildContent(locationObj.restaurant, i),
			});

			// // Listen for clicks on markers to show info window
			const clickListener = marker.addListener('click', ({domEvent, latLng}) => {
        const { target } = domEvent;


				showInfoBox(target, locationObj.restaurant, locationObj.coordinates);
				// toggleHighlight(marker)
			});

			const mouseListener = marker.addListener(
				'mouseenter',
				({ domEvent, latLng }) => {
					const { target } = domEvent;

					console.log('inside hover ==== ', target);
					// window.google.maps.event.removeListener(hoverListener);
				}
			);

			bounds.extend(marker.position);
		};

		for (let i = 0; i < restaurantLocations.length; i++) {
			addMarkers(restaurantLocations[i], i);
		}

		function toggleHighlight(markerView) {
			if (markerView.content.classList.contains('highlight')) {
				markerView.content.classList.remove('highlight');
				markerView.zIndex = null;
				console.log('remove highlight');
			} else {
				markerView.content.classList.add('highlight');
				markerView.zIndex = 10;
				console.log('add highlight');
			}
		}

		// create marker
		function buildContent(restaurant, i) {
			const content = document.createElement('div');
			content.classList.add('property');
			content.innerHTML = `
        <div class='result-icon icon-${i + 1}' type='button'>
          <p>${i + 1}<p>
        </div>
        <div class="result-restaurant-map-info-card" type='button'>
          <img class='result-restaurant-map-info-img' src='${
						restaurant.imgSrc
					}' alt='Restaurant Image'/>
          <h2>${restaurant.name}</h2>
          <div class='results-restaurant-map-info-rating'>
            ${infoRating[restaurant.rating]}
            <p>${restaurant.rating}</p>
        </div>
        `;
			return content;
		}

		// TODO comeback to later to figure out how to create a floating info window that can overlap maps
		// create info window
		function showInfoBox(target, restaurant, coordinates) {
      const rect = target.getBoundingClientRect();
			let infoBox = document.getElementById('infoBox');
			// let scale = Math.pow(2, map.getZoom());
			// let nw = new window.google.maps.LatLng(
			//   map.getBounds().getNorthEast().lat(),
			//   map.getBounds().getSouthWest().lng()
			//   );
			//   console.log(nw)
			// let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw)
			// let worldCoordinate = map.getProjection().fromLatLngToPoint(coordinates);
			// let pixelOffset = new window.google.maps.Point(Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale), Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale));
			// infoBox.style.left = pixelOffset.x + 'px';

      // Position the infoBox to the left of the target
      infoBox.style.top = (rect.top + window.scrollY) + 'px';
      infoBox.style.left = (rect.left - infoBox.offsetWidth) + 'px';

			infoBox.style.display = 'block';
			infoBox.style.right = '90%';
			infoBox.innerHTML = `
        <div class="result-restaurant-map-info-card-overlay" type='button'>
          <img class='result-restaurant-map-info-img-overlay' src='${
						restaurant.imgSrc
					}' alt='Restaurant Image'/>
          <h2>${restaurant.name}</h2>
          <div class='results-restaurant-map-info-rating-overlay'>
            ${infoRating[restaurant.rating]}
            <p>${restaurant.rating}</p>
        </div>
      `;
		}

		map.fitBounds(bounds);
	}

	initMap();

	if (!searchResults.length)
		return (
			<>
				<div id='results-map-loading'>
					<FontAwesomeIcon
						icon={faCircleNotch}
						spin
						size='2xl'
						style={{ color: '#8c8c8c' }}
					/>
				</div>
			</>
		);

	return (
		<>
			<div id='infoBox' className='hidden'></div>
			<div className='search-results-map' id='map'></div>
		</>
	);
}

export default ResultsMap;
