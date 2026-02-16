import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    refId: string;
    id: string;
    image: string;
    productName: string;
    productPrice: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    idDeleted: boolean;
}

const ProductSchema: Schema = new Schema({
    refId: { type: String, required: true },
    id: { type: String, required: true },
    image: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    idDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete (ret as any)._id;
            delete (ret as any).__v;
        }
    }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
