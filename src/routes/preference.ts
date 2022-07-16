import { Router } from 'express';
import isAuthenticated from '../middlewares/is-Authenticated';
import { getPreferences } from '../controllers/preferenceController';

const router = Router();
router.get('/', isAuthenticated, getPreferences);
export default router;