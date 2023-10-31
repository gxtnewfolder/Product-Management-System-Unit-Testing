const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./index');

describe('API Endpoints', () => {
    it('GET / should return "Hello World"', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello World');
    });
  
    it('GET /products should return a list of products', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  
    it('GET /products/:id should return a single product', async () => {
      const response = await request(app).get('/products/your-product-id'); // แทนที่ด้วย ID ที่มีอยู่ในฐานข้อมูล
      expect(response.status).toBe(200);
      expect(typeof response.body === 'object' && response.body !== null).toBe(true);
    });
  
    it('POST /products should create a new product', async () => {
      const newProduct = {
        name: 'New Product',
        category: 'New Category',
        price: 10.99,
        stock: 100,
      };
  
      const response = await request(app)
        .post('/products')
        .send(newProduct);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(newProduct));
    });
  
    it('PUT /products/:id should update a product', async () => {
      const updatedProductData = {
        name: 'Updated Product Name',
        price: 15.99,
      };
  
      const response = await request(app)
        .put('/products/your-product-id') // แทนที่ด้วย ID ที่มีอยู่ในฐานข้อมูล
        .send(updatedProductData);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(updatedProductData));
    });
  
    it('DELETE /products/:id should delete a product', async () => {
      const response = await request(app).delete('/products/your-product-id'); // แทนที่ด้วย ID ที่มีอยู่ในฐานข้อมูล
      expect(response.status).toBe(200);
    });
});
