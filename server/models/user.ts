import mongoose, { Document } from 'mongoose';
import { productSchema, ProductDocument } from './product'; // Import product schema

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    savedProducts: [productSchema], // Embed product schema
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  savedProducts: ProductDocument[];
}

const User = mongoose.model<UserDocument>('User', userSchema);

export { User, UserDocument };
