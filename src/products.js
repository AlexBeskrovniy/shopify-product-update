import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { shopify } from './index.js'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const getProducts = async () => {
    let products = [];
  
    let params = { limit: 250 };
  
    do {
        const data = await shopify.product.list(params);
        data.map(product => {
            const result = product.options.find(option => option.name === "Color");
            if (result) {
                products.push(product);
            }
        });
        params = data.nextPageParameters;
        
    } while (params !== undefined);
    fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, '\t'));
    console.log(`Result: ${products.length} products with 'Color' option.`);
    return products;
};

getProducts();