import express from 'express';
import attractionController from '../controllers/attractionController';

const router = express.Router({ mergeParams: true });
router.post('/', (req, res, next) => {
    Promise.resolve(attractionController.createAttraction(req, res, next)).catch(next);
});

export default router;