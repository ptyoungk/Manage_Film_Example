// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  actor: {}
};

// Reducer
export default function ActorEditEditReducer(state = JSON.parse(JSON.stringify(initialState)), action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_ACTOR_SUCCESS:
      return { ...state, actor: action.payload };
    case types.UPDATE_ACTOR_SUCCESS:
      return { ...state, actor: action.payload };
    case types.GET_ACTOR_SUCCESS:
      return { ...state, actor: action.payload };
    case types.FINDBYCAST_FILM_SUCCESS:
      return { ...state, listFilm: action.payload };
     // END REDUCERS
    
    case types.RESET_ACTOR:
      state = initialState;
      return state;
    default:
      return state;
  }
}