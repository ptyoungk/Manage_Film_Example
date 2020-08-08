import FilmModelGenerated from "./generated/FilmModelGenerated";

const customModel = {

  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await FilmModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...FilmModelGenerated,
  ...customModel
};
