import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteProductHard
} from '../controllers/product.controller';
import { validate } from '../middleware/validation';
import { ProductSchema } from '../utils/schemas';

const router = express.Router();

router.post('/', validate(ProductSchema), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', validate(ProductSchema.partial()), updateProduct);
router.delete('/:id', deleteProduct);
router.delete('/hard/:id', deleteProductHard);

export default router;
