const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Helper function to calculate total price
const calculateTotalPrice = (items) => items.reduce((acc, item) => acc + item.price, 0);

// Add an item to the cart
exports.addItemToCart = async (req, res) => {
  const { userId, productId } = req.body;
  const quantity = Number(req.body.quantity);
  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than zero" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex >= 0) {
      const existingItem = cart.items[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;

      // if (product.stock < newQuantity) {
      //   return res.status(400).json({ message: "Not enough stock available for the updated quantity" });
      // }

      existingItem.quantity = newQuantity;
      existingItem.price = newQuantity * product.price;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: quantity * product.price,
      });
    }

    // product.stock -= quantity;
    // await product.save();

    cart.totalPrice = calculateTotalPrice(cart.items);
    const updatedCart = await cart.save();

    res.status(201).json(updatedCart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Update item quantity in the cart
exports.updateCartItem = async (req, res) => {
  const { userId, productId, change } = req.body;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const existingItem = cart.items[itemIndex];

    // Find the product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate the new quantity
    const newQuantity = change;

    // If the new quantity is less than 1, return an error
    if (newQuantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Check stock availability when increasing quantity
    // if (change === 1 && product.stock < 1) {
    //   return res.status(400).json({ message: "Insufficient stock available" });
    // }

    // Update the item's quantity and price
    existingItem.quantity = newQuantity;
    existingItem.price = newQuantity * product.price;

    // Update product stock
    // product.stock -= change; 
    // await product.save();

    // Recalculate the total price of the cart
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

    // Save the updated cart
    const updatedCart = await cart.save();

    // Respond with the updated cart
    res.json({ message: "Cart updated successfully", cart: updatedCart });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Remove an item from the cart
exports.removeCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const item = cart.items[itemIndex];
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // product.stock += item.quantity;
    // await product.save();

    cart.items.splice(itemIndex, 1);
    cart.totalPrice = calculateTotalPrice(cart.items);

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price stock images');
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
