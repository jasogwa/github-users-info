import express from 'express';
import ProfileController from '../controllers/ProfileController';

const router = express.Router();

router.get('/:username', ProfileController.getUserData);

export default router;
