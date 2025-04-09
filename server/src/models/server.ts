import express, { Application } from 'express';
import cors from 'cors';
import routesUnits from '../routes/units';
import routesUser from '../routes/user';
import routesReports from '../routes/reports';
import routesContacto from '../routes/contacto'; // Corregido el nombre
import Units from './units'; // Asegúrate de que Units tenga export default
import User from './user';   // Asegúrate de que User tenga export default
import Report from './report'; // Importación corregida

class Server {
    private app: Application;
    private port: string;
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3002';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    
    

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        });
    }
    
    routes() {
        // Agregar middleware solo a las rutas que lo requieran
        this.app.use('/api/units', routesUnits);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/reports', routesReports);
        this.app.use("/api/contacto", routesContacto);
    }
    
    middlewares() {
        // Parseo body
        this.app.use(express.json());
        // Cors
        this.app.use(cors());
    }
    
    async dbConnect() {
        try {
            await Units.sync();
            await User.sync();
            await Report.sync(); // Agregado para sincronizar la tabla de reportes
            console.log('Base de datos conectada y sincronizada');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;
