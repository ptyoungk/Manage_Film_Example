import FilmMakerModelGenerated from "./generated/FilmMakerModelGenerated";

const customModel = {

  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await FilmMakerModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...FilmMakerModelGenerated,
  ...customModel
};
