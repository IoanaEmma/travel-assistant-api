import express from 'express';
import attractionController from '../controllers/attraction.controller';

const router = express.Router({ mergeParams: true });
router.post('/', (req, res, next) => {
    Promise.resolve(attractionController.createAttraction(req, res, next)).catch(next);
});

router.get('/cities', (req, res, next) => {
    Promise.resolve(attractionController.getAttractionsCities(req, res, next)).catch(next);
});

router.get('/', (req, res, next) => {
    Promise.resolve(attractionController.getAttractionsByCity(req, res, next)).catch(next);
});

router.delete('/:id', (req, res, next) => {
    Promise.resolve(attractionController.deleteAttraction(req, res, next)).catch(next);
});

export default router;