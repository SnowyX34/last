import { Router } from "express";
import { enviarCorreo } from "../services/emailservice";

const router = Router();

router.post("/", enviarCorreo);

export default router;
