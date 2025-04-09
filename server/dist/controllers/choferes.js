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
exports.getChoferById = exports.getChoferes = void 0;
const choferes_1 = __importDefault(require("../models/choferes"));
const getChoferes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todos los choferes de la base de datos
        const choferes = yield choferes_1.default.findAll();
        // Responder con los choferes encontrados
        res.json(choferes);
    }
    catch (error) {
        console.error('Error al obtener choferes:', error);
        res.status(500).json({
            message: 'Error al obtener choferes',
            error: error.message
        });
    }
});
exports.getChoferes = getChoferes;
// Obtener un chofer por su ID
const getChoferById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const chofer = yield choferes_1.default.findByPk(id);
        if (chofer) {
            res.json(chofer);
        }
        else {
            res.status(404).json({ message: `No se encontró chofer con el ID: ${id}` });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al obtener chofer',
            error: error.message
        });
    }
});
exports.getChoferById = getChoferById;
