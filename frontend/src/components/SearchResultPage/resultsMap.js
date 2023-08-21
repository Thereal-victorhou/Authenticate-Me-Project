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
          restaurant: res,
				});
			});

    // Create markers and in glyphs to them
    const addMarkers = (locationObj, i) => {
      // const pin = new PinElement({
      //   glyph: `${i + 1}`,
      //   glyphColor: "white",
      //   borderColor: "#ffff",
      //   background: '#F43939'
      // });
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: locationObj.coordinates,
        // title: locationObj.title,
        content: buildContent(locationObj.restaurant, i)
      });
      // // Listen for clicks on markers to show info window
      marker.addListener('click', () => {
        toggleHighlight(marker)
        // window.google.maps.event.removeListener(clickListener);
      });

      marker.addListener('mouseenter', ({ domEvent, latLng }) => {
        const {target} = domEvent;

        console.log('inside hover ==== ', target)
        // window.google.maps.event.removeListener(hoverListener);
      })

      bounds.extend(marker.position)
    }

    for (let i = 0; i < restaurantLocations.length; i++) {
      addMarkers(restaurantLocations[i], i)
    }

    function toggleHighlight(markerView) {
      if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        markerView.zIndex = null;
        console.log('remove highlight')
      } else {
        markerView.content.classList.add("highlight");
        markerView.zIndex = 10;
        console.log('add highlight')
      }
    }


    function buildContent(restaurant, i) {
      const content = document.createElement("div");

      content.classList.add("property");
      content.innerHTML = `
        <div class='result-icon icon-${i+1}' type='button'>
          <p>${i+1}<p>
        </div>
        <div class="result-restaurant-map-info-card">
          <img class='result-restaurant-map-info-img' src='${restaurant.imgSrc}' alt='Restaurant Image'/>
          <h2>${restaurant.name}</h2>
          <div class='results-restaurant-map-info-rating'>
            ${infoRating[restaurant.rating]}
            <p>${restaurant.rating}</p>
        </div>
        `;
      return content;
    }



    map.fitBounds(bounds);
	}

	initMap();



  if (!searchResults.length) return (

    <>
      <div id='results-map-loading'>
        <FontAwesomeIcon icon={faCircleNotch} spin size="2xl" style={{color: "#8c8c8c",}} />
      </div>
    </>
  )

  return <div className='search-results-map' id='map'></div>;


}

export default ResultsMap;
