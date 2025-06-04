import express from 'express';
import hotelController from '../controllers/hotelController';


const router = express.Router({ mergeParams: true });
router.get('/', (req, res, next) => {
    Promise.resolve(hotelController.getHotelDetails(req, res, next)).catch(next);
});

router.post('/', (req, res, next) => {
    Promise.resolve(hotelController.createHotel(req, res, next)).catch(next);
});

export default router;