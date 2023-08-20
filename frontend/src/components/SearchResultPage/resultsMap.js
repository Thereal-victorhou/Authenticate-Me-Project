import React from 'react';

function ResultsMap({ searchResults, location }) {
	// Initialize and add the map
	let map;
	async function initMap() {
		// The location of Uluru
		const center = { lat: location.lat, lng: location.lng };
		// Request needed libraries.
		//@ts-ignore
		const { Map } = await window.google.maps.importLibrary('maps');
		const { AdvancedMarkerElement, PinElement } =
			await window.google.maps.importLibrary('marker');

    const bounds = new window.google.maps.LatLngBounds();

		// The map, centered at selected location
		map = new Map(document.getElementById('map'), {
			zoom: 12,
			center: center,
			mapId: 'ff8dbb61c8194218',
		});

		const restaurantLocations = [];
		if (searchResults)
			searchResults.forEach((res, i) => {

				restaurantLocations.push({
					coordinates: { lat: Number(res.coordinates[0]), lng: Number(res.coordinates[1]) },
					title: `${res.location[0]}`,
				});
			});


    const addMarkers = (locationObj) => {
      const marker = new AdvancedMarkerElement({
        map: map,
        position: locationObj.coordinates,
        title: locationObj.title,
      });

      bounds.extend(marker.position)
    }

    for (let i = 0; i < restaurantLocations.length; i++) {
      addMarkers(restaurantLocations[i])
    }

    map.fitBounds(bounds);

	}

	initMap();

	return <div className='search-results-map' id='map'></div>;
}

export default ResultsMap;
