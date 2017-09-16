import express from 'express';
import user from './user';
import potties from './potties';
import poop from './poop';

const router = express.Router();

router.use('/user', user);
router.use('/potties', potties);
router.use('/poop', poop);

export default router;