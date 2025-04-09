// src/controllers/report.ts
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Report from '../models/report';

// Validación y sanitización de la entrada
const validateReportInput = [
    body('nombre')
        .trim()
        .matches(/^[a-zA-Z\s]+$/).withMessage("El nombre solo puede contener letras y espacios"),
    body('correo')
        .isEmail().withMessage("Debe ser un correo válido")
        .normalizeEmail(),
    body('fecha')
        .isISO8601().withMessage("Formato de fecha inválido"),
    body('hora')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Formato de hora inválido (HH:MM)"),
    body('ruta')
        .trim()
        .notEmpty().withMessage("La ruta no puede estar vacía"),
    body('categoria')
        .trim()
        .notEmpty().withMessage("La categoría no puede estar vacía"),
    body('descripcion')
        .trim()
        .isLength({ min: 10 }).withMessage("La descripción debe tener al menos 10 caracteres"),
    body('idChofer')
        .optional()
        .isInt().withMessage("El ID del chofer debe ser un número entero")
];

export const saveReport = async (req: Request, res: Response) => {
    await Promise.all(validateReportInput.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Extraer datos del request
        const { nombre, correo, fecha, hora, ruta, categoria, descripcion, idChofer } = req.body;

        // Guardamos el reporte en la base de datos
        const report = await Report.create({
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
    } catch (error: any) {
        console.error('Error al guardar el reporte:', error);
        res.status(500).json({ message: 'Error al guardar el reporte', error: error.message });
    }
};