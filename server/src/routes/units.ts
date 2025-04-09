import { Router } from 'express';
import { getUnits } from '../controllers/units';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getUnits)

export default router;