import { z } from 'zod';

export const ProductSchema = z.object({
    productName: z.string({ required_error: 'Product name is required', invalid_type_error: 'Product name is required' }).min(3, 'Product name must be at least 3 characters long'),
    productPrice: z.number({ required_error: 'Product price is required', invalid_type_error: 'Product price must be a number' }).positive('Product price must be a positive number'),
    image: z.string({ required_error: 'Image is required', invalid_type_error: 'Image is required' }).min(1, 'Image is required'),
    description: z.string({ required_error: 'Description is required', invalid_type_error: 'Description is required' }).min(10, 'Description must be at least 10 characters long'),
});

export const FileSchema = z.object({
    fileName: z.string().min(1),
    filePath: z.string().min(1),
    fileExtension: z.string().min(1),
    fileSize: z.number().positive(),
});
