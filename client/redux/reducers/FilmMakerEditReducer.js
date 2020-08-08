// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  filmmaker: {}
};

// Reducer
export default function FilmMakerEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_FILMMAKER_SUCCESS:
      return { ...state, filmmaker: action.payload };
    case types.UPDATE_FILMMAKER_SUCCESS:
      return { ...state, filmmaker: action.payload };
    case types.GET_FILMMAKER_SUCCESS:
      return { ...state, filmmaker: action.payload };
    case types.FINDBYFILMMAKER_FILM_SUCCESS:
      return { ...state, listFilm: action.payload };
     // END REDUCERS
    
    case types.RESET_FILMMAKER:
      state = initialState;
      return state;
    default:
      return state;
  }
}