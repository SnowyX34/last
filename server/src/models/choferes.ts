// src/models/choferes.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Choferes = sequelize.define('choferes', {
  id_chofer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  licencia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'choferes',
  timestamps: false
});

export default Choferes;