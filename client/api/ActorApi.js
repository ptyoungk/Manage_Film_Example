import ActorApiGenerated from "./generated/ActorApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class ActorApi extends ActorApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Actor List
  static getActorList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/actors")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default ActorApi;