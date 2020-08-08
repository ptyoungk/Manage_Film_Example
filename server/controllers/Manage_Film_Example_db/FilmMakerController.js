import FilmMakerControllerGenerated from "./generated/FilmMakerControllerGenerated";

// Properties
import Properties from "../../properties";

// Database
import FilmMakerModel from "../../models/Manage_Film_Example_db/FilmMakerModel";

// Security
import { authorize } from "../../security/SecurityManager";

// Errors
import Errors from "../../classes/Errors";
import ErrorManager from "../../classes/ErrorManager";

const customControllers = {
  
  /**
   * Override here your custom routes
   * EXAMPLE:
   *
    
   init: router => {
     const baseUrl = `${Properties.api}/filmmaker`;
     
     // custom route
     router.get(baseUrl + "/:id", customControllers.get);
     
     // Init super
     FilmMakerControllerGenerated.init(router);
    },

  */

  /**
   * Override here your custom controllers
   * EXAMPLE:
   *
   
    get: async (req, res) => {
      try {
        console.log("This is my custom controller");
        const result = await FilmMakerModel.get(req.params.id);
        res.json(result);
      } catch (err) {
        const safeErr = ErrorManager.getSafeError(err);
        res.status(safeErr.status).json(safeErr);
      }
    }

   */
   
};

export default {
  ...FilmMakerControllerGenerated,
  ...customControllers
};

