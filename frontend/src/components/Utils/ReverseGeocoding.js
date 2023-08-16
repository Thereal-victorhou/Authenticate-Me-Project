export default function getBusinessAddress(latitude, longitude, apiKey) {
  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  fetch(endpoint)
      .then(response => response.json())
      .then(data => {
          if (data.status === "OK") {
              const address = data.results[0].formatted_address;
              console.log(address);
              return address;
          } else {
              console.error('Error fetching address:', data.status);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
}
