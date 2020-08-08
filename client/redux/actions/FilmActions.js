import actionsFunction from "./generated/FilmActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import FilmApi from "../../api/FilmApi";
 
 actionsFunction.loadFilmList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return FilmApi
     .getFilmList()
     .then(list => {
       dispatch(actionsFunction.loadFilmSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
