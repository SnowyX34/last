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
exports.saveReport = void 0;
const express_validator_1 = require("express-validator");
const report_1 = __importDefault(require("../models/report"));
// Validación y sanitización de la entrada
const validateReportInput = [
    (0, express_validator_1.body)('nombre')
        .trim()
        .matches(/^[a-zA-Z\s]+$/).withMessage("El nombre solo puede contener letras y espacios"),
    (0, express_validator_1.body)('correo')
        .isEmail().withMessage("Debe ser un correo válido")
        .normalizeEmail(),
    (0, express_validator_1.body)('fecha')
        .isISO8601().withMessage("Formato de fecha inválido"),
    (0, express_validator_1.body)('hora')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Formato de hora inválido (HH:MM)"),
    (0, express_validator_1.body)('ruta')
        .trim()
        .notEmpty().withMessage("La ruta no puede estar vacía"),
    (0, express_validator_1.body)('categoria')
        .trim()
        .notEmpty().withMessage("La categoría no puede estar vacía"),
    (0, express_validator_1.body)('descripcion')
        .trim()
        .isLength({ min: 10 }).withMessage("La descripción debe tener al menos 10 caracteres"),
    (0, express_validator_1.body)('idChofer')
        .optional()
        .isInt().withMessage("El ID del chofer debe ser un número entero")
];
const saveReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(validateReportInput.map(validation => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Extraer datos del request
        const { nombre, correo, fecha, hora, ruta, categoria, descripcion, idChofer } = req.body;
        // Guardamos el reporte en la base de datos
        const report = yield report_1.default.create({
            nombre,
            correo,
            fecha,
            hora,
            ruta,
            categoria,
            descripcion,
            idChofer
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Reporte guardado exitosamente', report });
    }
    catch (error) {
        console.error('Error al guardar el reporte:', error);
        res.status(500).json({ message: 'Error al guardar el reporte', error: error.message });
    }
});
exports.saveReport = saveReport;
