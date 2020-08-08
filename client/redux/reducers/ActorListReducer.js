// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  list: []
};

// Reducer
export default function ActorListReducer(state = initialState, action) {
  switch (action.type) {
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.DELETE_ACTOR_SUCCESS:
      return { ...state, actor: action.payload };
    case types.LIST_ACTOR_SUCCESS:
      return { ...state, listActor: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}