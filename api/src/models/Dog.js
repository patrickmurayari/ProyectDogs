const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id : {
      type: DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      primaryKey : true,
      allowNull : false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura : {
      type:  DataTypes.TEXT,
      allowNull: false,
    },
    peso : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lifes_span : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdInDb : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true,
    }
  },{ timestamps: false });
};

