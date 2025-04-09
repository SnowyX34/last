import { Request, Response } from "express";
import transporter from "../nodemailer-config/transporter";

export const enviarCorreo = async (req: Request, res: Response) => {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "tucorreo@gmail.com", // Reemplaza con tu correo personal
        subject: "Nuevo Mensaje de Contacto",
        text: `**Nuevo mensaje de contacto**\n\n Nombre: ${nombre}\n Correo: ${correo}\n Mensaje:\n${mensaje}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado con éxito" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ error: "Error al enviar el correo" });
    }
};
