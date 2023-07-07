const express = require('express');
const ProductManager = require('../components/ProductManager');
const CartManager = require('../components/CartManager');

const app = express();

app.use(express.json({ extended: true }));
const port = 8080;

const productManager = new ProductManager();
const cartManager = new CartManager();

app.use(express.json());

// Rutas para la gestión de productos
app.get('/api/products/', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

app.get('/api/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.post('/api/products/', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  productManager.addProduct(title, description, price, thumbnail, code, stock);
  res.status(201).json({ message: 'Producto agregado correctamente' });
});
app.delete('/api/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const result = productManager.deleteProductById(productId);
  if (result) {
    res.json({ message: 'Producto eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});


// Rutas para la gestión de carritos
app.post('/api/carts/', (req, res) => {
  const { products } = req.body;
  const newCart = cartManager.createCart(products);
  res.status(201).json(newCart);
});

app.get('/api/carts/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cartProducts = cartManager.getCartProducts(cartId);
  if (cartProducts) {
    res.json(cartProducts);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const quantity = req.body.quantity || 1; 
  
  cartManager.addProductToCart(cartId, productId, quantity);
  
  res.status(201).json({ message: 'Producto agregado al carrito correctamente' });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});





