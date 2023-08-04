
// type
const UPDATE_LOCATION = '/navigation/GET_LOCATION';

// action
const updateLocation = (selectedLocation) => {
	return {
		type: UPDATE_LOCATION,
		selectedLocation,
	};
};

// thunk
export const saveLocation = (selectedLocation) => (dispatch) => {
	dispatch(updateLocation(selectedLocation));
}

// reducer
const locationReducer = (state = {}, action)=> {
  let newState;
  switch(action.type) {
      case UPDATE_LOCATION:
          newState = {...action.selectedLocation}
          return newState;
      default:
          return state;
  }
}

export default locationReducer;
