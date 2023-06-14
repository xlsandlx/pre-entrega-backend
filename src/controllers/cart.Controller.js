import { Cart } from '../model/cart.js';
import { carts } from '../db/carts.db.js';
import { products } from '../db/products.db.js';

export function createCart (req, res){
    const newCart = new Cart()
    res.status(201).json({ message: "Carrito agregado exitosamente" });
}

export function getCartById (req, res) {
    const { cid } = req.params
    const cart = carts.find((cart) => cart.id == cid)

    if (isNaN(cid)) {
        return res.status(400).json({ message: "El id debe ser numerico" })
    }

    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" })
    }
    res.status(200).json({ cart })
}

export function getAllCarts (req,res){
    res.status(200).json({ carts })
}

export function addProductToCart (req, res) {
    const {cid,pid} = req.params
    const cart = carts.find((cart) => cart.id == cid)
    const existingProduct = cart.products.find((item) => item.product == pid)

    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" })
    }
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else { 
        cart.products.push({ product: pid, quantity: 1 })
    }
    
    res.status(200).json({ message: "Producto agregado al carrito exitosamente" })
}

export function deleteProductInCart (req, res) {
    const {cid,pid} = req.params
    const cart = carts.find((cart) => cart.id == cid)
    const updatedProducts = cart.products.filter((item) => item.product != pid)

    if (!cart){
        return res.status(404).json({ message: "Carrito no encontrado" })
    } 

    if (updatedProducts.length === cart.products.length){
        return res.status(404).json({ message: "Producto no encontrado en el carrito" })
    } 
    
    cart.products = updatedProducts
    res.status(200).json({ message: "Producto eliminado del carrito exitosamente" })
}