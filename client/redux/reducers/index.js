import { combineReducers } from "redux";

// START IMPORT REDUCERS
import ActorEditReducer from "./ActorEditReducer";
import ActorListReducer from "./ActorListReducer";
import FilmEditReducer from "./FilmEditReducer";
import FilmListReducer from "./FilmListReducer";
import FilmMakerEditReducer from "./FilmMakerEditReducer";
import FilmMakerListReducer from "./FilmMakerListReducer";
import HomeReducer from "./HomeReducer";

// END IMPORT REDUCERS


// CUSTOM REDUCERS
import LoginReducer from "./LoginReducer";
import ProfileReducer from "./ProfileReducer";
import UserEditReducer from "./UserEditReducer";
import UserListReducer from "./UserListReducer";

const rootReducer = combineReducers({
  
  // INSERT HERE YOUR CUSTOM REDUCERS
  LoginReducer,
  ProfileReducer,
  UserEditReducer,
  UserListReducer,

  // START COMBINE REDUCERS
	ActorEditReducer,
	ActorListReducer,
	FilmEditReducer,
	FilmListReducer,
	FilmMakerEditReducer,
	FilmMakerListReducer,
	HomeReducer,
 // END COMBINE REDUCERS

});

export default rootReducer;
