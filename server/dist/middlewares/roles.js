"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
// Middleware para verificar si el rol es 'admin'
const isAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.rol) !== "admin") {
        return res.status(403).json({ message: "Acceso denegado. No eres administrador" });
    }
    next();
};
exports.isAdmin = isAdmin;
