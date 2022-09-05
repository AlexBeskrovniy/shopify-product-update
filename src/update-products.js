import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { shopify } from './index.js'
import { validColors } from './css-colors.js';
import { colorMap } from './map.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const updateProductColorsInStore = async () => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json')));
    const newData = data.map(product => {
        const option = product.options.find(option => option.name === 'Color');
        const colorOption = `option${option.position}`;
  
  
        const { ok, edit } = product.variants.reduce((acc, cur) => {
            if(validColors.includes(cur[colorOption])) {
                acc.ok.push(cur);
            } else {
                acc.edit.push(cur);
            }
            return acc;
        }, { ok: [], edit: [] })
  
        const existedVariants = Array.from(new Set(ok.map(v => v[colorOption])));
        if (!edit.length) {
            console.log('Nothing to update');
            return;
        }
        const res = edit.reduce((acc, variant) => {
            const variantColor = variant[colorOption];
            if(validColors.includes(colorMap[variantColor]) && !existedVariants.includes(colorMap[variantColor])) {
                const updateData = {};
                updateData[colorOption] = colorMap[variantColor];
                acc.update.push({
                  id: variant.id,
                  data: updateData
                });
            } else {
                acc.delete.push({
                  id: variant.id,
                  productId: product.id
                });
            }
  
            return acc;
        }, { update: [] , delete: [] });
        res.update.map(({ id, data }) => {
            shopify.productVariant.update(id, data)
             .then(console.log(`Updated variant id = ${id} from product title = ${product.title}`))
             .catch(console.error);
        })
  
        res.delete.map(({ productId, id }) => {
            shopify.productVariant.delete(productId, id)
             .then(console.log(`Deleted variant id = ${id} from product title = ${product.title}`))
             .catch(console.error);
        })
    });
};
  
updateProductColorsInStore();