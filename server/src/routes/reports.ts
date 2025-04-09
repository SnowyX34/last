import { Router } from 'express';
import { saveReport } from '../controllers/report';
import { rateLimitReviews } from '../middlewares/rateLimit';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.post('/', verifyToken,rateLimitReviews, saveReport);

export default router;
