import actionsFunction from "./generated/ActorActionsGenerated";

// You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
/** 
 // EXAMPLE:
 
 import ActorApi from "../../api/ActorApi";
 
 actionsFunction.loadActorList = function() {
   return function(dispatch) {
     console.log("This is my custom function");
     return ActorApi
     .getActorList()
     .then(list => {
       dispatch(actionsFunction.loadActorSuccess(list));
      })
      .catch(error => {
        throw error;
      });
    };
  };
  
*/

export default actionsFunction;
