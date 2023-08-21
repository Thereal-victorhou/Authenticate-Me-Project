import React from 'react';

function ResultsMap({ searchResults, location }) {
	// Initialize and add the map
	let map;
	async function initMap() {
		// The location of Uluru
		const center = { lat: location.lat, lng: location.lng };
		// Request needed libraries.
		//@ts-ignore
		const { Map, InfoWindow } = await window.google.maps.importLibrary('maps');
		const { AdvancedMarkerElement, PinElement } =
			await window.google.maps.importLibrary('marker');

    const bounds = new window.google.maps.LatLngBounds();

		// The map, centered at selected location
		map = new Map(document.getElementById('map'), {
			zoom: 12,
			center: center,
			mapId: 'ff8dbb61c8194218',
		});

    const infoWindow = new InfoWindow();

		const restaurantLocations = [];

		if (searchResults)
			searchResults.forEach((res) => {

				restaurantLocations.push({
					coordinates: { lat: Number(res.coordinates[0]), lng: Number(res.coordinates[1]) },
					title: `${res.name}`,
				});
			});

    // Create markers and in glyphs to them
    const addMarkers = (locationObj, i) => {
      const pin = new PinElement({
        glyph: `${i + 1}`,
      });
      const marker = new AdvancedMarkerElement({
        map: map,
        position: locationObj.coordinates,
        title: locationObj.title,
        content: pin.element
      });
      // Listen for clicks on markers to show info window
      marker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;

        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
      });

      bounds.extend(marker.position)
    }

    for (let i = 0; i < restaurantLocations.length; i++) {
      addMarkers(restaurantLocations[i], i)
    }

    map.fitBounds(bounds);

	}

	initMap();

	return <div className='search-results-map' id='map'></div>;
}

export default ResultsMap;
