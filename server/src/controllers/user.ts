import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user'
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const validateUserInput = [
    body('user_name')
        .trim()
        .matches(/^[a-zA-Z0-9]+$/).withMessage("El nombre solo puede contener letras y números"),
    body('user_secondName')
        .trim()
        .matches(/^[a-zA-Z0-9]+$/).withMessage("El apellido solo puede contener letras y números"),
    body('email')
        .isEmail().withMessage("Debe ser un correo válido")
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
        .matches(/^[a-zA-Z0-9]+$/).withMessage("La contraseña solo puede contener letras y números"),
];

const validateLogin = [
    body('email')
        .isEmail().withMessage("Debe ser un correo válido")
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
];

export const newUser = async (req: Request, res: Response) => {

    await Promise.all(validateUserInput.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_name, password, user_secondName, email, rol } = req.body;

    //Validamos si el usuario existe en la base de datos
    const user = await User.findOne({where:{email:email}}) // seria lo mismo que SELECT * FROM USER WHERE USER_NME = PARAMETRO


    if(user){
        return res.status(400).json({
            msg: 'La contraseña o correo ingresada es incorrecta'
        })
    }

    const hashedpassword = await bcrypt.hash(password, 10)
    if (!user_name || !user_secondName || !email || !password) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    try{
        await User.create({
            user_name: user_name,
            password: hashedpassword,
            user_secondName,
            email,
            rol
        })
        res.json({
            msg: `User ${user_name} created succesfully` //Para que funcione la agregacionde la vriable por ${} es obligtorio usar las comills del tipo ``
        })
    }catch(error){
        res.status(400).json({
            msg: 'An error haas been ocurred',
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    await Promise.all(validateLogin.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Datos inválidos", errors: errors.array() });
    }

    
    const { email, password } = req.body;

    // Validamos si el usuario existe en la bd
    const user: any = await User.findOne({ where: { email: email } });

    if (!user) {
        return res.status(400).json({
            msg: `Ha ocurrido un problema, vuelve a intentar`
        });
    }

    // Validamos password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "La contraseña o correo ingresada es incorrecta"
        });
    }

    // Generamos token con el email y el rol
    const token = jwt.sign(
        {
            email: user.email, 
        }, 
        process.env.SECRET_KEY || 'ulisesfloresmtz', 
        {
            expiresIn: '1h' // Token válido por 1 hora
        }
    );

    res.json({ token });
};
