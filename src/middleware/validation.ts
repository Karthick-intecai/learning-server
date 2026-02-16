import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            console.log('Validation Error on:', req.originalUrl);
            const errors = (error as any).errors || (error as any).issues || [];

            const formattedError = Array.isArray(errors) && errors.length > 0 ? errors[0].message : error.message;

            return res.status(400).json({
                message: 'Validation failed',
                errors: formattedError,
            });
        }
        next(error);
    }
};
