const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, brand, price, oldPrice, screenSize, storage, camera, battery, category, images, stock } = req.body;

    // Check for required fields
    if (!name || !brand || !price || !category) {
      return res.status(400).json({ message: 'Please provide all required product details' });
    }

    if (Number(oldPrice) <= Number(price)) {
      return res.status(400).json({ message: 'Old price must be greater than the new price' });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(409).json({ message: 'Product already exists' });
    }

    const newProduct = new Product({
      name,
      brand,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      screenSize,
      storage,
      camera,
      battery,
      category,
      images,
      stock: Number(stock),
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, could not add product' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch the product' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, oldPrice, category, stock, images, brand } = req.body;

    if ( !name && !description && !price && !oldPrice && !category && !stock && !images && !brand) {
      return res.status(400).json({ message: 'No field to update' });
    }

    if(Number(oldPrice)){
      if (Number(oldPrice) <= Number(price)) {
        return res.status(400).json({ message: 'Old price must be greater than the new price' });
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, oldPrice, category, stock, images, brand },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update the product' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the product' });
  }
};
