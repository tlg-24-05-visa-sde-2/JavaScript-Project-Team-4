"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * This is a generic mongoDB connection using the factory settings,
 * update this connection to use your mongoDB connection string
 *
*/
const mongoose_1 = __importDefault(require("mongoose"));
// Your database connection URI, add your db name to the end of the connection string
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hometownharvest';
// Connect to the database
mongoose_1.default.connect(uri);
// Export the mongoose connection object
exports.default = mongoose_1.default.connection;
