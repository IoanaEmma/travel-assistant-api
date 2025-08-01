import express from 'express';
import flightController from '../controllers/flight.controller';

const router = express.Router({ mergeParams: true });
router.post('/', (req, res, next) => {
    Promise.resolve(flightController.createFlight(req, res, next)).catch(next);
});

router.get('/cities', (req, res, next) => {
    Promise.resolve(flightController.getFlightCities(req, res, next)).catch(next);
});

router.get('/', (req, res, next) => {
    Promise.resolve(flightController.getFlightsByCity(req, res, next)).catch(next);
});

router.delete('/:id', (req, res, next) => {
    Promise.resolve(flightController.deleteFlight(req, res, next)).catch(next);
});

export default router;