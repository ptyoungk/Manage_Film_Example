// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function FilmMakerListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_FILMMAKER_SUCCESS:
      return { ...state, filmmaker: action.payload };
    case types.LIST_FILMMAKER_SUCCESS:
      return { ...state, listFilmMaker: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}