const fs = require('fs/promises');

class CartManager {
  constructor() {
    this.path = './../src/Data/carts.json';
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  async saveCarts() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2) + '\n', { flag: 'w' });
  }

  generateUniqueCartId() {
    const cartIds = this.carts.map(cart => cart.id);
    let newId = 1;
    while (cartIds.includes(newId)) {
      newId++;
    }
    return newId;
  }

  async createCart(products) {
    const newCartId = this.generateUniqueCartId();
    const newCart = {
      id: newCartId,
      products: products || []
    };
  
    // Agregar el nuevo carrito al arreglo de carritos existentes
    this.carts.push(newCart);
  
    await this.saveCarts();
    return newCart;
  }

  async getCartProducts(cartId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    return cart ? cart.products : null;
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    
    const existingProduct = cart.products.find(product => product.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity; 
    } else {
      cart.products.push({ id: productId, quantity: quantity });
    }
    
    await this.saveCarts();
  }
  

  async getCartById(cartId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    return cart || null;
  }

  async addProductToCartById(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    const existingProduct = cart.products.find(product => product.id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ id: productId, quantity: 1 });
    }
    await this.saveCarts();
  }
}

module.exports = CartManager;



  