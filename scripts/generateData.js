import { randomUUID } from 'crypto';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const categories = ['Electronics', 'Apparel', 'Home Goods', 'Books', 'Food'];

const productNames = {
  Electronics: ['Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Monitor', 'Keyboard', 'Mouse', 'Camera', 'Speaker', 'Smartwatch'],
  Apparel: ['T-Shirt', 'Jeans', 'Jacket', 'Sneakers', 'Dress', 'Sweater', 'Shorts', 'Boots', 'Hat', 'Scarf'],
  'Home Goods': ['Lamp', 'Chair', 'Table', 'Rug', 'Curtains', 'Pillow', 'Blanket', 'Vase', 'Mirror', 'Clock'],
  Books: ['Novel', 'Cookbook', 'Biography', 'Textbook', 'Comic', 'Magazine', 'Dictionary', 'Atlas', 'Journal', 'Almanac'],
  Food: ['Coffee', 'Tea', 'Chocolate', 'Pasta', 'Rice', 'Cereal', 'Snacks', 'Juice', 'Cookies', 'Sauce']
};

const adjectives = ['Premium', 'Deluxe', 'Standard', 'Professional', 'Classic', 'Modern', 'Vintage', 'Eco-Friendly', 'Luxury', 'Budget'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function generateDataItem() {
  const category = categories[randomInt(0, categories.length - 1)];
  const productBase = productNames[category][randomInt(0, productNames[category].length - 1)];
  const adjective = adjectives[randomInt(0, adjectives.length - 1)];
  
  return {
    id: randomUUID(),
    productName: `${adjective} ${productBase}`,
    category,
    price: randomFloat(10.0, 1000.0),
    stock: randomInt(0, 500),
    lastUpdate: randomDate(new Date(2023, 0, 1), new Date()),
    description: `High-quality ${productBase.toLowerCase()} with excellent features and durability.`
  };
}

function generateDataset(count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateDataItem());
  }
  return data;
}

const dataCount = process.env.DATA_COUNT ? parseInt(process.env.DATA_COUNT) : 25000;
console.log(`Generating ${dataCount} data items...`);

const dataset = generateDataset(dataCount);

const dataDir = `${__dirname}/../data`;
mkdirSync(dataDir, { recursive: true });

writeFileSync(`${dataDir}/mock_data.json`, JSON.stringify(dataset, null, 2));

console.log(`✓ Generated ${dataCount} items and saved to data/mock_data.json`);
console.log(`File size: ${(JSON.stringify(dataset).length / 1024 / 1024).toFixed(2)} MB`);
