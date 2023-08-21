import React from 'react';

import bigZeroStar from '../../images/regular_0@2x.png';
import bigOneStar from '../../images/regular_1@2x.png';
import bigOneHalfStar from '../../images/regular_1_half@2x.png';
import smallOneStar from '../../images/regular_1.png';
import bigTwoStar from '../../images/regular_2@2x.png';
import bigTwoHalfStar from '../../images/regular_2_half@2x.png';
import smallTwoStar from '../../images/regular_2.png';
import bigThreeStar from '../../images/regular_3@2x.png';
import bigThreeHalfStar from '../../images/regular_3_half@2x.png';
import smallThreeStar from '../../images/regular_3.png';
import bigFourStar from '../../images/regular_4@2x.png';
import bigFourHalfStar from '../../images/regular_4_half@2x.png';
import smallFourStar from '../../images/regular_4.png';
import bigFiveStar from '../../images/regular_5@2x.png';
import smallFiveStar from '../../images/regular_5.png';


function ResultsMap({ searchResults, location }) {

	let map;

  const infoRating = {

    1: `<div className='-info-big-star' id='one'>
          <img src="${bigOneStar}" style='height: 20px' id='one' alt='one star' />
        </div>`,


    1.5:
        `<div className='-info-big-star' id='one-half-star'>
          <img src="${bigOneHalfStar}" style='height: 20px' alt='one and a half star' />
        </div>`,

    2:
      `<div className='-info-big-star' id='two-star'>
        <img src="${bigTwoStar}" style='height: 20px' alt='two star' />
      </div>`,


    2.5:
        `<div className='-info-big-star' id='two-half-star'>
          <img src="${bigTwoHalfStar}" style='height: 20px' alt='two and a half star' />
        </div>`,

    3:
      `<div className='-info-big-star' id='three-star'>
        <img src="${bigThreeStar}" style='height: 20px' alt='three star' />
      </div>`,

    3.5:
        `<div className='-info-big-star' id='three-half-star'>
          <img src="${bigThreeHalfStar}" style='height: 20px' alt='three and a half star' />
        </div>`,

    4:
      `<div className='-info-big-star' id='four-star'>
        <img src="${bigFourStar}" style='height: 20px' alt='four star' />
      </div>`,

    4.5:
        `<div className='-info-big-star' id='four-half-star'>
          <img src="${bigFourHalfStar}" style='height: 20px' alt='four and a half star' />
        </div>`,

    5:
      `<div className='-info-big-star' id='five-star'>
        <img src="${bigFiveStar}" style='height: 20px' alt='five star' />
      </div>`,

    0:
      `<div className='-info-big-star' id='zero-star'>
        <img src="${bigZeroStar}" style='height: 20px' alt='zero star' />
      </div>`,
  }

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
      const pin = new PinElement({
        glyph: `${i + 1}`,
        glyphColor: "white",
        borderColor: "#ffff",
        background: '#F43939'
      });
      const marker = new AdvancedMarkerElement({
        map: map,
        position: locationObj.coordinates,
        title: locationObj.title,
        content: buildContent(locationObj.restaurant, i)
      });
      // Listen for clicks on markers to show info window
      const clickListener = marker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;

        toggleHighlight(marker, locationObj.restaurant)


        // window.google.maps.event.removeListener(clickListener);
      });

      bounds.extend(marker.position)
    }

    for (let i = 0; i < restaurantLocations.length; i++) {
      addMarkers(restaurantLocations[i], i)
    }

    function toggleHighlight(markerView, restaurant) {
      if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        markerView.zIndex = null;
        console.log('remove highlight')
      } else {
        markerView.content.classList.add("highlight");
        markerView.zIndex = 3;
        console.log('add highlight')
      }
    }


    function buildContent(restaurant, i) {
      const content = document.createElement("div");

      // content.classList.add("results-restaurant-icon-group");
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

	return <div className='search-results-map' id='map'></div>;
}

export default ResultsMap;
