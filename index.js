const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;
app.use(bodyParser.json());

const productSchema = new mongoose.Schema({
    id:Number,
    name: String,
    category: String,
    price: Number,
    stock: Number
});
  
const Product = mongoose.model('product', productSchema);
module.exports = Product;

const connectDB = async () => {
  try {
      await mongoose.connect('mongodb+srv://admin:1234@cluster0.cooyb5m.mongodb.net/productDB');
      console.log('Database connected');
  } catch (err) {
      console.log(err);
  }
}

connectDB();

// Read all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error('Product not found');
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Create a product
app.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an item by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json(deletedProduct);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
