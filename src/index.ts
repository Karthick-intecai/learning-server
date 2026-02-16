import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import DB from './config/db';
import productRoutes from './routes/product.routes';
import filesRoutes from './routes/files.routes';

dotenv.config({ debug: true });

DB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/files', filesRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('API is running. Access endpoints at /api/products or /api/files');
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
