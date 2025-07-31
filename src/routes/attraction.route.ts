import express from 'express';
import attractionController from '../controllers/attraction.controller';

const router = express.Router({ mergeParams: true });
router.post('/', (req, res, next) => {
    Promise.resolve(attractionController.createAttraction(req, res, next)).catch(next);
});

export default router;