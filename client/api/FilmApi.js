import FilmApiGenerated from "./generated/FilmApiGenerated";

// Dependencies
//import axios from "axios";
//import { properties } from "../config/properties";

class FilmApi extends FilmApiGenerated {
  // You can customize the base actions overriding the object "actionsFunction" as shown in the example below:
  /** 
  // EXAMPLE:
 
  // Get Film List
  static getFilmList() {
    console.log("This is my custom API");

    return fetch("http://localhost:3000/api/films")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
  */

}

export default FilmApi;