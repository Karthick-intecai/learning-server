import { Request, Response } from 'express';
import File from '../models/files.models';
import fs from 'fs';
import path from 'path';

export const uploadFiles = async (req: Request, res: Response) => {
    try {
        if (!(req as any).file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { filename, path: filePath, size, originalname } = (req as any).file;
        const fileExtension = originalname.split('.').pop() || '';

        const file = new File({
            fileName: filename,
            filePath,
            fileExtension,
            fileSize: size
        });

        const createdFile = await file.save();
        res.status(201).json(createdFile);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteFile = async (req: Request, res: Response) => {
    try {
        const file = await File.findOne({ fileName: req.params.fileName });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        if (file.filePath) {
            const fullPath = path.resolve(file.filePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }

        await file.deleteOne();
        res.status(200).json({ message: 'File removed' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
