import { Request, Response } from 'express';
import Product from '../models/product.models';
import File from '../models/files.models';
import { v4 as uuidv4 } from 'uuid';

// create product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { productName, productPrice, image, description } = req.body;

        if (image) {
            const fileExists = await File.findOne({ filePath: image });
            if (!fileExists) {
                return res.status(400).json({ message: 'Image file not found in database' });
            }
        }

        let refId = 'PROD00001';
        const lastProduct = await Product.findOne({}, {}, { sort: { createdAt: -1 } });

        if (lastProduct && lastProduct.refId) {
            const match = lastProduct.refId.match(/^PROD(\d+)$/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                refId = `PROD${nextNum.toString().padStart(5, '0')}`;
            }
        }

        const productId = uuidv4();
        const product = new Product({
            refId: refId,
            id: productId,
            productName,
            productPrice,
            image: image || '',
            description: description || '',
            idDeleted: false
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const query = { idDeleted: false };
        const products = await Product.find(query).skip(skip).limit(limit);
        const total = await Product.countDocuments(query);

        res.status(200).json({
            products,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// get product by id
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({ id: req.params.id, idDeleted: false });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// update product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productName, productPrice, image, description } = req.body;
        const product = await Product.findOne({ id: req.params.id, idDeleted: false });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (productName) product.productName = productName || product.productName;
        if (productPrice) product.productPrice = productPrice || product.productPrice;
        if (image) product.image = image || product.image;
        if (description) product.description = description || product.description;
        product.updatedAt = new Date();

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// delete product (Soft Delete)
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({ id: req.params.id, idDeleted: false });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.idDeleted = true;
        product.updatedAt = new Date();
        await product.save();

        res.status(200).json({ message: 'Product removed' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProductHard = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.deleteOne();
        res.status(200).json({ message: 'Product removed' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
