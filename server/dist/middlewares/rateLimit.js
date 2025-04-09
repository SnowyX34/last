"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitReviews = void 0;
const userReviewLimits = new Map();
const rateLimitReviews = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const userId = req.user.id;
    const now = Date.now();
    const resetTime = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    if (!userReviewLimits.has(userId)) {
        userReviewLimits.set(userId, { count: 0, lastReset: now });
    }
    const userData = userReviewLimits.get(userId);
    // Si ha pasado más de un día, reiniciar contador
    if (now - userData.lastReset > resetTime) {
        userData.count = 0;
        userData.lastReset = now;
    }
    // Verificar límite de reseñas
    if (userData.count >= 3) {
        return res.status(429).json({ message: 'Límite de 3 reseñas por día alcanzado' });
    }
    userData.count++;
    userReviewLimits.set(userId, userData);
    next();
};
exports.rateLimitReviews = rateLimitReviews;
