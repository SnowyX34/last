import { Request, Response } from 'express';
import { Units } from '../models/units';

export const getUnits = async (req: Request, res: Response) => {
    const listUnits = await Units.findAll();

    res.json(listUnits)
}