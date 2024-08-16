import { DataTypes } from 'sequelize';
import {databaseSequelize} from '../config/database'
import Marca from './Marca.model';

const Vehiculo = databaseSequelize.define('Vehiculo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
}, {
  tableName: 'vehiculos',
  timestamps: false,
});

Vehiculo.belongsTo(Marca, { foreignKey: 'marca_id' });

module.exports = Vehiculo;
