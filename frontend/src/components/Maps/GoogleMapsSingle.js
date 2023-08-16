import { Wrapper } from '@googlemaps/react-wrapper';
import { useRef, useEffect, useState } from 'react';

let lat, lng;

function GoogleMapsSingle({ latitude, longitude, restaurant }) {

  lat = latitude;
  lng = longitude;

	return (
		<Wrapper
			apiKey={process.env.GOOGLE_MAPS_API_KEY}
      version="beta"
			libraries={['marker']}
    >
      <MyMap lat={lat} lng={lng}/>
    </Wrapper>
	);
}

const mapOptions = {
  mapId: process.env.GOOGLE_MAPS_API_KEY,
  // center: { lat: 43.66293, lng: -79.39314 },
  zoom: 17,
  disableDefaultUI: true,
}

function MyMap({ lat, lng }) {
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(()=> {
    mapOptions['center'] = { lat: lat, lng: lng }
    setMap(new window.google.maps.Map(ref.current, mapOptions))
  }, [])

  return <><div ref={ref} id='restaurant-map-container' /></>
}

export default GoogleMapsSingle;
