import express from 'express';
import cors from 'cors';
import userfunction from '../controller/User.controller.js'

const router= express.Router();

router.post('/signup', userfunction.Signup);
router.post('/login', userfunction.login);

export default router;