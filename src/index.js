import 'dotenv/config';
import Shopify from 'shopify-api-node';

export const shopify = new Shopify({
    shopName: process.env.SHOP_NAME,
    accessToken: process.env.ACCESS_TOKEN,
    autoLimit: true
  });