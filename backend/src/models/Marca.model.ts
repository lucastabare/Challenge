import { DataTypes } from 'sequelize';
import { databaseSequelize } from '../config/database';

const Marca = databaseSequelize.define('Marca', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais_origen: {
    type: DataTypes.STRING,
  },
  ano_fundacion: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'marcas',
  timestamps: false,
});

export default Marca;  
