import mongoose, { Document, Schema  } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        quantitySold: {
            type: Number,
            required: true,
            default: 0
        },
        quantityAvailable: {
            type: Number,
            required: true
        },
        sellersName: {
            type: String,
            required: true
        },
        sellersLocation: {
            type: String,
            required: true
        },
        tags: [{
            type: String
        }],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        priceId: {
            type: String,
            required: false
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }
    }
);

interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    quantitySold: number;
    quantityAvailable: number;
    sellersName: string;
    sellersLocation: string;
    tags: string[];
    user: mongoose.Schema.Types.ObjectId;
    priceId: string;
}

productSchema.index({ name: 'text', description: 'text', tags: 'text'});

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export { Product, ProductDocument, productSchema };