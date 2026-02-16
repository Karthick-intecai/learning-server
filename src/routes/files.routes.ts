import express from 'express';
import { uploadFiles, deleteFile } from '../controllers/files.controllers';
import { upload } from '../middleware/upload';

const router = express.Router();

router.post('/', upload.single('file'), uploadFiles);
router.delete('/:fileName', deleteFile);

export default router;
