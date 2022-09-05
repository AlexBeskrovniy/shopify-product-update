- **npm run get-product** - Get all products with 'Color' option from the store and save their to the .json file.
- **npm run get-colors** - Get every 'Color' option from the products array in .json file with quantity of use.
- **npm run update-products** - Update color option for all variants in the store according the map of valid colors and delete variants with invalid colors.
- **npm start** - Get all products with 'Color' option from the store and update it immediately.

> [!CAUTION]
> Don't use **npm run update-products** before you run **npm run get-products** because of the update script take the data from local .json file created by get-products script!