import express from 'express';
import trufcontroller from '../controller/Turf.controller.js';
import multer from 'multer';
import { storage } from '../cloudinary.js';

const upload = multer({ storage });
const router=express.Router();

router.post('/add', upload.single('image'),trufcontroller.addTurf);
router.get('/list', trufcontroller.listTurf);
router.post('/checkslot', trufcontroller.checkSlotAvailability);

export default router;