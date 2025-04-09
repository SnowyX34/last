import { Sequelize } from "sequelize";


const sequelize = new Sequelize('rrhh', 'root', '120704', {
    host: 'localhost',
    dialect: 'mysql',   
});

export default sequelize;