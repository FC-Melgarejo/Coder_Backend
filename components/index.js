//📌aca creamos la clase con su contructor Products y el array vacio/;

class ProductManager {
  constructor() {
    this.products = [];
  }
  /*📌aca creo el addproduct que se encarga de dar el producto inicial y que a su vez me valide las propiedades requeridas de cada campo */

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      return console.log("Error: Todos los campos son obligatorios.");
    }
    //📌con el metodo find buscamos por codigo de cada producto para evitar duplicarlo

    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      return console.log("Error: El código del producto ya existe.");
    }
    //📌aca le asignamos el identificador unico al producto que vamos incrementando y con el push agregamos al arreglo el producto

    product.id = this.products.length + 1;
    this.products.push(product);
    console.log("Producto agregado correctamente.");
  }
  //📌con este metodo nos devuelve el arreglo actualizado en ese momento

  getProducts() {
    return this.products;
  }
  //📌aca en este metodo filtramos el id de cada producto en caso de no encontrar nos devuelve en consola NOt found

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      return "Not Found";
    }
  }
}
//📌 aca lo que hacemos es crear una instancia de ProductManager que llamamos manger en donde con addProduct agregamos los productos pasando los atibutos de cada producto individualmente del producto inicial arriba mencionados

const manager = new ProductManager();

manager.addProduct({
  title: "Zapatillas",
  description: "Unas zapatillas deportivas",
  price: 59.99,
  thumbnail: "img/zapatillas.jpg",
  code: "5678",
  stock: 10,
});

manager.addProduct({
  title: "Camiseta",
  description: "Una camiseta de algodón",
  price: 19.99,
  thumbnail: "img/camiseta.jpg",
  code: "5678",
  stock: 5,
});
//📌 bien aca ulizamos el metodo getProducts para mostrar todos nuestros productos
const allProducts = manager.getProducts();
console.log(allProducts);
//📌finalmente con getProducById buscamos los productos por su id
const productById = manager.getProductById(1);
console.log(productById);