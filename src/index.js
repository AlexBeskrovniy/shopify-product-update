import * as fs from 'fs';
import Shopify from 'shopify-api-node';
import { config } from './config.js';
import { validColors } from './css-colors.js';
import { colorMap } from './map.js';

export const shopify = new Shopify({
  shopName: config.shopName,
  //apiKey: config.apiKey,
  accessToken: config.accessToken
});

const getProducts = async () => {
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
  console.log(products.length);
  fs.writeFileSync('records/products.json', JSON.stringify(products, null, '\t'));
};

// const colorsCounter = () => {
//   const data = JSON.parse(fs.readFileSync('records/products.json'));
//   const colors = data.reduce((acc, cur) => {
//       cur.colors.map(color => {
//           if (!acc[color]) {
//               acc[color] = { qnt: 1};
//           } else {
//               acc[color].qnt += 1;
//           }
//       });
//       return acc;
//   }, {});
//   console.log(colors);
// }

const colorsCounter = () => {
  const data = JSON.parse(fs.readFileSync('records/products.json'));
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

//colorsCounter();

const updateProductColorsInStore = async () => {
  const data = JSON.parse(fs.readFileSync('records/products.json'));
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

      console.log(existedVariants);

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
           .then(console.log)
           .catch(console.error);
      })

      res.delete.map(({ productId, id }) => {
          shopify.productVariant.delete(productId, id)
           .then(console.log)
           .catch(console.error);
      })
  });
}
