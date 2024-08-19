import { DataTypes, Model } from 'sequelize';
import { databaseSequelize } from '../config/database';
import Vehiculo from './Vehiculo.model';

export class Orden extends Model {
    declare id: number;
    declare vehiculo_id: number;
    declare usuario_id: number;
    declare fecha_orden: Date;
    declare total: number;
}

Orden.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vehiculo_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Vehiculo,
                key: 'id',
            },
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha_orden: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        tableName: 'ordenes',
        sequelize: databaseSequelize,
        timestamps: false,
    }
);

Orden.belongsTo(Vehiculo, { foreignKey: 'vehiculo_id' });

export default Orden;
