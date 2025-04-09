"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailservice_1 = require("../services/emailservice");
const router = (0, express_1.Router)();
router.post("/", emailservice_1.enviarCorreo);
exports.default = router;
