import { Router } from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { activateAccountSchema, emailSchema, resetPasswordSchema, signupSchema, signinSchema } from '../validators/auth';
import { signIn, signUp, resendActivationToken, activateAccount, forgotPassword, resetPassword } from '../controllers/authController';


const router = Router();
router.post('/signup', validateRequest(signupSchema), signUp);
router.post('/activate-account', validateRequest(activateAccountSchema), activateAccount);
router.post('/resend-activation-token', validateRequest(emailSchema), resendActivationToken);
router.post('/forgot-password', validateRequest(emailSchema), forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPassword);
router.post('/signin', validateRequest(signinSchema), signIn);

export default router;
