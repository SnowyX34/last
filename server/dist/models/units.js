"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Units = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Units = connection_1.default.define('units', {
    id_vehiculo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    placa: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    modelo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_chofer: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('disponible', 'en uso', 'mantenimiento'),
        allowNull: false
    }
}, {
    tableName: 'units', // Asegura que la tabla se llame correctamente
});
exports.default = exports.Units;
