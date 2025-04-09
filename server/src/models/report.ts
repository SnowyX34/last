// src/models/report.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';
import Chofer from './choferes'; // Importa el modelo de choferes

export const Report = sequelize.define('reports', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  idChofer: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'choferes',    // Nombre de la tabla referenciada
      key: 'id_chofer'      // Columna referenciada (actualizada)
    }
  }
}, {
  tableName: 'reports',
});

// Establece la relación entre Report y Chofer
Report.belongsTo(Chofer, { foreignKey: 'idChofer', targetKey: 'id_chofer' });
Chofer.hasMany(Report, { foreignKey: 'idChofer', sourceKey: 'id_chofer' });

export default Report;