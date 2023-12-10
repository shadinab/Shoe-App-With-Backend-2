import express from 'express';
import {
  getAllShoes,
  getShoe,
  addShoe,
  updateShoe,
  deleteShoe,
} from '../controllers/shoesController.js';

// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/addingshoes').post(addShoe);
router.route('/getAllShoes').get(getAllShoes);

router.route('/:id').get(getShoe)
router.route('/:id').put(updateShoe)
router.route('/:id').delete(deleteShoe);

export default router;
