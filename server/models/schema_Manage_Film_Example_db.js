// Import Sequelize
import Sequelize from "sequelize";
import Database from "../classes/Database_Manage_Film_Example_db";

export default init => {
  let sequelize = Database.getConnection();


    /**
      * ------------------------------------
      * Start define generated schema
      *
      * The content of this section will be overwritten on each documentation, 
      * please insert your customization at the top or at the end of the file.
      * ------------------------------------
      */



    /**
      * ------------------------------------
      * Actor
      * ------------------------------------
      */
    class Actor extends Sequelize.Model{}
    Actor.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      birthDate: {
        type: Sequelize.DATE
      },
      
      name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      surname: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      
      
      //EXTERNAL RELATIONS
      /*
      cast: {
        type: Sequelize.INTEGER,
        references: {
          model: Film,
          key: '_id',
        }
      },
      */
    },
      { sequelize, tableName: "actor", timestamps: false }
    );



    /**
      * ------------------------------------
      * Film
      * ------------------------------------
      */
    class Film extends Sequelize.Model{}
    Film.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      genre: {
        type: Sequelize.STRING
      },
      
      title: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      year: {
        type: Sequelize.FLOAT
      },
      
      //RELATIONS
        
        
      filmMaker:  {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: "FilmMaker",
          key: '_id',
        },
      },
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "film", timestamps: false }
    );



    /**
      * ------------------------------------
      * FilmMaker
      * ------------------------------------
      */
    class FilmMaker extends Sequelize.Model{}
    FilmMaker.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      surname: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      
      
      //EXTERNAL RELATIONS
      /*
      filmMaker: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: Film,
          key: '_id',
        }
      },
      */
    },
      { sequelize, tableName: "filmmaker", timestamps: false }
    );



    /**
      * ------------------------------------
      * User
      * ------------------------------------
      */
    class User extends Sequelize.Model{}
    User.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      mail: {
        type: Sequelize.STRING
      },
      
      name: {
        type: Sequelize.STRING
      },
      
      password: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      surname: {
        type: Sequelize.STRING
      },
      
      username: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      //RELATIONS
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "user", timestamps: false }
    );


    /**
      * ------------------------------------
      * Relations many to many
      * ------------------------------------
      */

    
    
    Film.belongsToMany(Actor, {
        through: "Film_cast",
        as: "cast",
        foreignKey: "id_Film",
        otherKey: "id_Actor",
        timestamps: false
    });

    
    
  /**
   * ------------------------------------
   * End define generated schema
      * ------------------------------------
      */

    /**
      * ------------------------------------
      * Roles
      * ------------------------------------
      */
    class Roles extends Sequelize.Model{}
    Roles.init({
      _id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      role: {
        type: Sequelize.STRING
      },
      
      //RELATIONS
        
      _user:  {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: '_id',
        },
      }
      
      
      //EXTERNAL RELATIONS
      /*
      */
    },
      { sequelize, tableName: "roles", timestamps: false }
    );

    User.hasMany(Roles, {
      foreignKey: "_user"
    });

    /**
      * ------------------------------------
      * Insert here your custom models
      * ------------------------------------
      */

};
