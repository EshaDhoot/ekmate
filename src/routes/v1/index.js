import express from 'express';
const router = express.Router();

import { validateEmailOrPhone, validateOTP, validateSignIn } from '../../middlewares/validation-middleware.js';
import { signUp, verifyOTP, signIn } from '../../controllers/user-controller.js';
import { createBus, getBus } from '../../controllers/bus-controller.js';
import { createQuery } from '../../controllers/contact-form-controller.js';

router.post('/auth/sign-up', validateEmailOrPhone, signUp);
router.post('/auth/verify-otp', validateOTP, verifyOTP);
router.post('/auth/sign-in', validateSignIn, signIn);

router.post('/create-bus', createBus);
router.get('/get-buses', getBus);

router.post('/contact-form-query', createQuery);

export default router;