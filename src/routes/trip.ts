import express from 'express';
import tripController from '../controllers/tripController';

const router = express.Router({ mergeParams: true });
router.post('/', (req, res, next) => {
    Promise.resolve(tripController.createTrip(req, res, next)).catch(next);
});

router.put('/:tripId', (req, res, next) => {
    Promise.resolve(tripController.addItemToTrip(req, res, next)).catch(next);
});

router.get('/:userId', (req, res, next) => {
    Promise.resolve(tripController.getTrips(req, res, next)).catch(next);
});

router.get('/:userId/:tripId', (req, res, next) => {
    Promise.resolve(tripController.getTripDetails(req, res, next)).catch(next);
});

export default router;