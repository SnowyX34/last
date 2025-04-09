"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_1 = require("../controllers/report");
const rateLimit_1 = require("../middlewares/rateLimit");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.verifyToken, rateLimit_1.rateLimitReviews, report_1.saveReport);
exports.default = router;
