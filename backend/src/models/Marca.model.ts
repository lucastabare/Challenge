import { DataTypes, Model } from 'sequelize';
import { databaseSequelize } from '../config/database';

export class Marca extends Model {
    declare id: number;
    declare nombre: string;
    declare pais_origen?: string;
    declare ano_fundacion?: number;
}

Marca.init(
    {
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
    },
    {
        tableName: 'marcas',
        sequelize: databaseSequelize,
        timestamps: false,
    }
);

export default Marca;
