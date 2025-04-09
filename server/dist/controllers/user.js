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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const validateUserInput = [
    (0, express_validator_1.body)('user_name')
        .trim()
        .matches(/^[a-zA-Z0-9]+$/).withMessage("El nombre solo puede contener letras y números"),
    (0, express_validator_1.body)('user_secondName')
        .trim()
        .matches(/^[a-zA-Z0-9]+$/).withMessage("El apellido solo puede contener letras y números"),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage("Debe ser un correo válido")
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
        .matches(/^[a-zA-Z0-9]+$/).withMessage("La contraseña solo puede contener letras y números"),
];
const validateLogin = [
    (0, express_validator_1.body)('email')
        .isEmail().withMessage("Debe ser un correo válido")
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
];
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(validateUserInput.map(validation => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { user_name, password, user_secondName, email, rol } = req.body;
    //Validamos si el usuario existe en la base de datos
    const user = yield user_1.default.findOne({ where: { email: email } }); // seria lo mismo que SELECT * FROM USER WHERE USER_NME = PARAMETRO
    if (user) {
        return res.status(400).json({
            msg: 'La contraseña o correo ingresada es incorrecta'
        });
    }
    const hashedpassword = yield bcrypt_1.default.hash(password, 10);
    if (!user_name || !user_secondName || !email || !password) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }
    try {
        yield user_1.default.create({
            user_name: user_name,
            password: hashedpassword,
            user_secondName,
            email,
            rol
        });
        res.json({
            msg: `User ${user_name} created succesfully` //Para que funcione la agregacionde la vriable por ${} es obligtorio usar las comills del tipo ``
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'An error haas been ocurred',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(validateLogin.map(validation => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Datos inválidos", errors: errors.array() });
    }
    const { email, password } = req.body;
    // Validamos si el usuario existe en la bd
    const user = yield user_1.default.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({
            msg: `Ha ocurrido un problema, vuelve a intentar`
        });
    }
    // Validamos password
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "La contraseña o correo ingresada es incorrecta"
        });
    }
    // Generamos token con el email y el rol
    const token = jsonwebtoken_1.default.sign({
        email: user.email,
    }, process.env.SECRET_KEY || 'ulisesfloresmtz', {
        expiresIn: '1h' // Token válido por 1 hora
    });
    res.json({ token });
});
exports.loginUser = loginUser;
