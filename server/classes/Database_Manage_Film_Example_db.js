// Import Sequelize
import Sequelize from "sequelize";
import InitSchema from "../models/schema_Manage_Film_Example_db";
import UserModel from "../models/Manage_Film_Example_db/UserModel";

// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info(
      "Database connected at: " +
        properties.Manage_Film_Example_db.host +
        ":" +
        properties.Manage_Film_Example_db.port +
        "//" +
        properties.Manage_Film_Example_db.user +
        "@" +
        properties.Manage_Film_Example_db.name
    );

    // Import schema
    InitSchema();

    await UserModel.createAdminUser();

  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");

    const sequelize = new Sequelize(
      properties.Manage_Film_Example_db.name,
      properties.Manage_Film_Example_db.user,
      properties.Manage_Film_Example_db.password,
      {
        host: properties.Manage_Film_Example_db.host,
        dialect: properties.Manage_Film_Example_db.dialect,
        port: properties.Manage_Film_Example_db.port,
        logging: false
      }
    );
    this.dbConnection_Manage_Film_Example_db = sequelize;

    try {
      await sequelize.sync();
    } catch (err) {
      // Catch error here
      Logger.error(`Failed connection to the DB`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_Manage_Film_Example_db;
  }
}

export default new Database();
