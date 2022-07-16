
import { Router } from 'express';
import isAuthenticated from '../middlewares/is-Authenticated';
import validateRequest from '../middlewares/validate-request';
import { userPrefereneSchema } from '../validators/user';
import { addUserPreference, getUser } from '../controllers/userController';

const router = Router();
router.post('/preference', validateRequest(userPrefereneSchema), isAuthenticated, addUserPreference);
router.get('/', isAuthenticated, getUser);
export default router;