// src/middlewares/roles.ts
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any; // Agregar usuario a la request
}

// Middleware para verificar si el rol es 'admin'
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado. No eres administrador" });
  }
  next();
};
