// src/controllers/choferes.ts
import { Request, Response } from 'express';
import Choferes from '../models/choferes';

export const getChoferes = async (req: Request, res: Response) => {
    try {
        // Obtener todos los choferes de la base de datos
        const choferes = await Choferes.findAll();
        
        // Responder con los choferes encontrados
        res.json(choferes);
    } catch (error: any) {
        console.error('Error al obtener choferes:', error);
        res.status(500).json({ 
            message: 'Error al obtener choferes', 
            error: error.message 
        });
    }
};

// Obtener un chofer por su ID
export const getChoferById = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const chofer = await Choferes.findByPk(id);
        
        if (chofer) {
            res.json(chofer);
        } else {
            res.status(404).json({ message: `No se encontró chofer con el ID: ${id}` });
        }
    } catch (error: any) {
        res.status(500).json({ 
            message: 'Error al obtener chofer', 
            error: error.message 
        });
    }
};