"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
// src/models/report.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const choferes_1 = __importDefault(require("./choferes")); // Importa el modelo de choferes
exports.Report = connection_1.default.define('reports', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ruta: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    idChofer: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'choferes',
            key: 'id_chofer' // Columna referenciada (actualizada)
        }
    }
}, {
    tableName: 'reports',
});
// Establece la relación entre Report y Chofer
exports.Report.belongsTo(choferes_1.default, { foreignKey: 'idChofer', targetKey: 'id_chofer' });
choferes_1.default.hasMany(exports.Report, { foreignKey: 'idChofer', sourceKey: 'id_chofer' });
exports.default = exports.Report;
