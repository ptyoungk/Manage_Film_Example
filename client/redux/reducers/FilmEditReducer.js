// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  film: {}
};

// Reducer
export default function FilmEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_FILM_SUCCESS:
      return { ...state, film: action.payload };
    case types.UPDATE_FILM_SUCCESS:
      return { ...state, film: action.payload };
    case types.GET_FILM_SUCCESS:
      return { ...state, film: action.payload };
    case types.LIST_FILMMAKER_SUCCESS:
      return { ...state, listFilmMaker: action.payload };
    case types.LIST_ACTOR_SUCCESS:
      return { ...state, listActor: action.payload };
     // END REDUCERS
    
    case types.RESET_FILM:
      state = initialState;
      return state;
    default:
      return state;
  }
}