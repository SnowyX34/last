"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const units_1 = __importDefault(require("../routes/units"));
const user_1 = __importDefault(require("../routes/user"));
const reports_1 = __importDefault(require("../routes/reports"));
const contacto_1 = __importDefault(require("../routes/contacto")); // Corregido el nombre
const units_2 = __importDefault(require("./units")); // Asegúrate de que Units tenga export default
const user_2 = __importDefault(require("./user")); // Asegúrate de que User tenga export default
const report_1 = __importDefault(require("./report")); // Importación corregida
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
        this.app.use('/api/units', units_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/reports', reports_1.default);
        this.app.use("/api/contacto", contacto_1.default);
    }
    middlewares() {
        // Parseo body
        this.app.use(express_1.default.json());
        // Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield units_2.default.sync();
                yield user_2.default.sync();
                yield report_1.default.sync(); // Agregado para sincronizar la tabla de reportes
                console.log('Base de datos conectada y sincronizada');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
