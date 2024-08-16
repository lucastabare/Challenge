const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vehiculo = require('./Vehiculo');

const Orden = sequelize.define('Orden', {
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
}, {
    tableName: 'ordenes',
    timestamps: false,
});

Orden.belongsTo(Vehiculo, { foreignKey: 'vehiculo_id' });

module.exports = Orden;
