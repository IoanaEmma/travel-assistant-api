import express from 'express';
import tripController from '../controllers/trip.controller';

const router = express.Router({ mergeParams: true });
router.post('/', (req, res, next) => {
    Promise.resolve(tripController.createTrip(req, res, next)).catch(next);
});

router.put('/add-item/:tripId', (req, res, next) => {
    Promise.resolve(tripController.addItemToTrip(req, res, next)).catch(next);
});

router.get('/:userId', (req, res, next) => {
    Promise.resolve(tripController.getTrips(req, res, next)).catch(next);
});

router.get('/:userId/:tripId', (req, res, next) => {
    Promise.resolve(tripController.getTripDetails(req, res, next)).catch(next);
});

router.put('/update/:tripId', (req, res, next) => {
    Promise.resolve(tripController.updateTrip(req, res, next)).catch(next);
});

router.delete('/:tripId', (req, res, next) => {
    Promise.resolve(tripController.deleteTrip(req, res, next)).catch(next);
});

router.delete('/remove-item/:tripId', (req, res, next) => {
    Promise.resolve(tripController.removeItemFromTrip(req, res, next)).catch(next);
});

export default router;