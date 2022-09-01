export const colorMap = {
    'Plum cyan': 'Plum',
    'Cream yellow': 'Beige',
    'Gray green': 'Green',
    'Bone': 'Beige',
    'Ellow': 'Yellow',
    'Dotted white': 'White',
    'Grey': 'Gray',
    'Transparent': 'White',
    'Dark': 'Gray',
    'Milk': 'Beige',
    'Leaf': 'Green',
    'Mint': "Green",
    'Wood': 'Sienna',
    'Aloe': 'Green',
    'Cactus': 'Green',
    'Seaweed': 'Green',
    'Maple': 'Sienna',
    'Light gray': 'Gray',
    'green': 'Green',
    'Turquoise': 'Turquoise',
    'Bronze': 'Chocolate',
    'Light green': 'Green'
};


// const { valid, overwrite } = Object.entries(colorMap).reduce((acc, [key, val]) => {
//     if(key === val) {
//         acc.valid.push(val);
//         return acc;
//     }
//     if(!val) {
//         return acc;
//     }
//     acc.overwrite[key] = val;
//     return acc;
// }, { valid: [], overwrite: {} });

// console.log('valid', valid);
// console.log('overwrite', overwrite);