const fs = require("fs/promises");

class Carrito {
  constructor() {
    this.path = "./carts.json";
    this.carts = [];
  }

  static id = 0;

  addProductToCart = async (cartId, productId) => {
    let cart = this.carts.find((cart) => cart.id === cartId);
    if (!cart) {
      cart = { id: cartId, products: [{ id: productId, quantity: 1 }] };
      this.carts.push(cart);
    } else {
      let product = cart.products.find((product) => product.id === productId);
      if (product) {
        product.quantity++;
      } else {
        cart.products.push({ id: productId, quantity: 1 });
      }
    }
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2) + "\n");
  };

  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  };
}

module.exports = Carrito;
