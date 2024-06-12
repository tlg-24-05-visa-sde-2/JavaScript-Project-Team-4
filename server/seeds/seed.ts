import mongoose from 'mongoose';
import { Product, ProductDocument } from '../models/product';
const fs = require('fs');
import productData from './productData.json';

mongoose.connect('mongodb://localhost:27017/hometownharvest');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});
async function seedProducts() {
  try {
    await Product.deleteMany({}); // Clear existing products

    const products = await Product.insertMany(productData); // Insert new products

    console.log('Products seeded successfully:', products.length);
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database after seeding
  }
}

seedProducts();
