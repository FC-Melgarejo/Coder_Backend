
const express = require('express');
const app = express();
const ProductManager = require('../components/ProductManager');

const products = new ProductManager();

app.get('/products', async (req, res) => {
  try {
    const allProducts = await products.readProducts();
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(allProducts);
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
  } catch (error) {
    res.status(500).send('Error al obtener los productos');
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const allProducts = await products.readProducts();
    let id = parseInt(req.params.id);
    let productById = allProducts.find((product) => product.id === id);
    if (!productById) return res.status(404).send('Producto no encontrado');
    res.send(productById);
  } catch (error) {
    res.status(500).send('Error al obtener el producto');
  }
});

app.listen(8080, () => {
  console.log("Servidor Express escuchando en el puerto 8080");
});






