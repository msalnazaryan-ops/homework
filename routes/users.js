import { Router } from 'express';
import { registration, login } from '../controllers/users.js';

const router = Router();

router.post('/registration', registration);
router.post('/login', login);

export default router;