import FilmMakerApiGenerated from "./generated/FilmMakerApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class FilmMakerApi extends FilmMakerApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get FilmMaker List
  static getFilmMakerList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/filmmakers")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default FilmMakerApi;