import express from 'express';
import chatController from '../controllers/chatController'; 


const router = express.Router({ mergeParams: true });
router.post('/', (req, res, next) => {
  Promise.resolve(chatController.chat(req, res, next)).catch(next);
});

export default router;