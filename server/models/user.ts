// Generic User Schema for mongoDB, add to or take away to make this fit your needs

import mongoose, { Document } from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        streetAddress: String,
        city: String,
        state: String,
        zip: String,
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
}

const User = mongoose.model<UserDocument>('User', userSchema);

export { User, UserDocument }; 