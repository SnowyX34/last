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
exports.enviarCorreo = void 0;
const transporter_1 = __importDefault(require("../nodemailer-config/transporter"));
const enviarCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, mensaje } = req.body;
    if (!nombre || !correo || !mensaje) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "tucorreo@gmail.com",
        subject: "Nuevo Mensaje de Contacto",
        text: `**Nuevo mensaje de contacto**\n\n Nombre: ${nombre}\n Correo: ${correo}\n Mensaje:\n${mensaje}`,
    };
    try {
        yield transporter_1.default.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado con éxito" });
    }
    catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ error: "Error al enviar el correo" });
    }
});
exports.enviarCorreo = enviarCorreo;
