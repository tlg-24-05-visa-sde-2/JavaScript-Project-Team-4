"use strict";
// Generic User Schema for mongoDB, add to or take away to make this fit your needs
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    streetAddress: String,
    city: String,
    state: String,
    zip: String,
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
