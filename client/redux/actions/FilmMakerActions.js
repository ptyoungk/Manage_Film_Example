import actionsFunction from "./generated/FilmMakerActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import FilmMakerApi from "../../api/FilmMakerApi";
 
 actionsFunction.loadFilmMakerList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return FilmMakerApi
     .getFilmMakerList()
     .then(list => {
       dispatch(actionsFunction.loadFilmMakerSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
