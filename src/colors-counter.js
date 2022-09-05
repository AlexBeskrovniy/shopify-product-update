import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const colorsCounter = () => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json')));
    const colors = data.reduce((acc, cur) => {
      const option = cur.options.find(option => option.name === 'Color');
      const colorOption = `option${option.position}`;
        cur.variants.map(variant => {
            if (!acc[variant[colorOption]]) {
                acc[variant[colorOption]] = { qnt: 1};
            } else {
                acc[variant[colorOption]].qnt += 1;
            }
        });
        return acc;
    }, {});
    console.log(colors);
}

colorsCounter();