import { DataTypes, Model } from "sequelize";
import { databaseSequelize } from '../config/database';
import Marca from './Marca.model';

export class Vehiculo extends Model {
  declare id: number;
  declare marca_id: number;
  declare descripcion: string;
  declare kilometros: number;
  declare modelo: string;
  declare file: string; //Si hay de una foto pasar a array de string
  declare puertas: number;
  declare precio: number;
  declare color: string;
  declare cc_motor: number;
}

Vehiculo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marca_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Marca,
        key: 'id',
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    kilometros: {
      type: DataTypes.INTEGER,
    },
    modelo: {
      type: DataTypes.STRING,
    },
    file: {
      type: DataTypes.STRING //Aca guardo el path de los archivos subido a firebase
    },
    puertas: {
      type: DataTypes.INTEGER,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
    },
    color: {
      type: DataTypes.STRING,
    },
    cc_motor: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'vehiculos',
    sequelize: databaseSequelize,
    timestamps: false,
  }
);

Vehiculo.belongsTo(Marca, { foreignKey: 'marca_id', as: 'marca' });

export default Vehiculo;
