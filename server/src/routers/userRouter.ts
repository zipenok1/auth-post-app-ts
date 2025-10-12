import { Router } from 'express';
import userContriller from 'controllers/userContriller.js';

const router = Router();

router.post('/register', userContriller.registr);
router.post('/login', userContriller.login);

export default router;
