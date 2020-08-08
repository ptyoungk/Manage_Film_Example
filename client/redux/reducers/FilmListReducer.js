// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function FilmListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_FILM_SUCCESS:
      return { ...state, film: action.payload };
    case types.LIST_FILM_SUCCESS:
      return { ...state, listFilm: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}