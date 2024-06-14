const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')("sk_test_51PQub32Kq7ZuBPIY3OIoyV6MRArUtuTMOr5hZf3LBDjmmX2gjDcy6zDgvygtFXgdTAz5q7OQMeRNTorGVHnbiLe500SO6tJaAa");

// Check if the API key is loaded correctly
// if (!process.env.STRIPE_TEST) {
//     console.error('Stripe API key is not set. Please check your .env file.');
//     process.exit(1);
// }

const inputFilePath = 'productData.json';  // Input JSON file path
const outputFilePath = 'updated_products.json';  // Output JSON file path

// Read products data from the JSON file
const products = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

async function createProductsAndPrices() {
    for (const productData of products) {
        try {
            // Create Product
            const product = await stripe.products.create({
                name: productData.name,
                description: productData.description,
                images: [productData.image]
            });

            // Create Price
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: Math.round(productData.price * 100), // Convert to cents
                currency: 'usd'
            });

            // Add price ID to the product data
            productData.priceId = price.id;

            console.log(`Product created: ${product.name}, Price ID: ${price.id}`);
        } catch (error) {
            console.error(`Failed to create product and price for ${productData.name}:`, error);
        }
    }

    // Write updated products data back to the JSON file
    fs.writeFileSync(outputFilePath, JSON.stringify(products, null, 2), 'utf8');
    console.log(`Updated products data with price IDs saved to ${outputFilePath}`);
}

createProductsAndPrices();