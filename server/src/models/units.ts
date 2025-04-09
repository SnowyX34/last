import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Units = sequelize.define('units', {
    id_vehiculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    placa: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_chofer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('disponible', 'en uso', 'mantenimiento'),
        allowNull: false
    }
}, {
    tableName: 'units',  // Asegura que la tabla se llame correctamente
});

export default Units;
