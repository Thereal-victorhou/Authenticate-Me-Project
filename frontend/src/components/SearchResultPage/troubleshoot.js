
function ResultsMap({ restaurantLocations }) {

	const resultLocationRefs = useRef({});
	const [currentIdx, setCurrentIdx] = useState(null);


  useEffect(() => {
    if (resultLocationRefs.current) console.log(resultLocationRefs.current)
  }, [currentIdx])

  // set currentIdx to current index
  const highlight = (i) => {
    setCurrentIdx(i);
  };

  // set currentIdx to null
  const hide = () => {
    setCurrentIdx(null);
  };

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

  return (
    <>
      <div className='infoBox'>
				{renderInfoBox(currentIdx)}
			</div>
			<GoogleMap
				mapContainerStyle={containerStyle}
				zoom={11}
				options={mapOptions}>
				{restaurantLocations.length &&
					restaurantLocations.map((res, i) => AdvancedMarkerElement(res, i))}
			</GoogleMap>
    </>
  )
}
