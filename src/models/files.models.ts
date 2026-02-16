import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
    fileName: string;
    filePath: string;
    fileExtension: string;
    fileSize: number;
}

const FileSchema: Schema = new Schema({
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileExtension: { type: String, required: true },
    fileSize: { type: Number, required: true }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete (ret as any)._id;
            delete (ret as any).__v;
        }
    }
});

const File = mongoose.model<IFile>('File', FileSchema);

export default File;
