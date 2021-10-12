import { csrfFetch } from './csrf';
/*---------------TYPES----------------------*/
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

/*---------------ACTION----------------------*/
const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
/*---------------THUNK----------------------*/
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const restoreUser = () => async dispatch => {
  const res = await csrfFetch('/api/session');
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return res;
};

/*---------------REDUCER----------------------*/
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;





// 0:
// createdAt: "2021-10-12T17:24:19.472Z"
// id: 1
// location: "39 Pier Ste A-202 San Francisco, CA"
// name: "Fog Harbor Fish House"
// phoneNumber: "4154212442"
// updatedAt: "2021-10-12T17:24:19.472Z"
