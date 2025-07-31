import express from 'express';
import flightController from '../controllers/flight.controller';

const router = express.Router({ mergeParams: true });
router.post('/', (req, res, next) => {
    Promise.resolve(flightController.createFlight(req, res, next)).catch(next);
});

export default router;