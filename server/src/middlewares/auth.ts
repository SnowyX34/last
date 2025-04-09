// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  user?:JwtPayload | any; // Agregar usuario a la request
}

// Middleware para verificar el token JWT
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No hay token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'ulisesfloresmtz');
    req.user = decoded;
    next();
  } catch (error) {
  }
};



