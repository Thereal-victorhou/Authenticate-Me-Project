import { csrfFetch } from "./csrf";

/*----------TYPES----------*/
const ADD = 'session/ADD';
const REMOVE = 'session/REMOVE'

/*----------ACTIONS----------*/
const addSessionUser = (user) => ({
    type: ADD,
    user,
});

const removeSessionUser = (user) => ({
    type: REMOVE,
    user
});


/*----------THUNK CREATORS----------*/
export const login = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential: "Demo-lition",
            password: 'password'
        })
    });
    const user = await res.json();

    if (!user) {
        const user = null;
        dispatch(addSessionUser(user));
    }
    dispatch(addSessionUser(user));

}

/*----------REDUCER----------*/
const initialState = {
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD: return {
            ...state,
            ...action.user
        }
        default:
            return state;
    }
}

export default userReducer;
