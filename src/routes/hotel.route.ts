import express from 'express';
import hotelController from '../controllers/hotel.controller';


const router = express.Router({ mergeParams: true });
router.get('/', (req, res, next) => {
    Promise.resolve(hotelController.getHotelDetails(req, res, next)).catch(next);
});

router.post('/', (req, res, next) => {
    Promise.resolve(hotelController.createHotel(req, res, next)).catch(next);
});

router.get('/cities', (req, res, next) => {
    Promise.resolve(hotelController.getHotelsCities(req, res, next)).catch(next);
});

router.get('/all', (req, res, next) => {
    Promise.resolve(hotelController.getHotelsByCity(req, res, next)).catch(next);
});

router.delete('/:id', (req, res, next) => {
    Promise.resolve(hotelController.deleteHotel(req, res, next)).catch(next);
});

export default router;