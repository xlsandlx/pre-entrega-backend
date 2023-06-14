import { Router } from 'express'
import { getProducts } from '../controllers/product.Controllers.js'
import { getProductsById } from '../controllers/product.Controllers.js'
import { createProduct } from '../controllers/product.Controllers.js'
import { updateProduct } from '../controllers/product.Controllers.js'
import { deleteProduct } from '../controllers/product.Controllers.js'

const router = Router()

router.get('/', getProducts)

router.get('/:pid', getProductsById)

router.post('/', createProduct)

router.put('/:pid', updateProduct)

router.delete('/:pid', deleteProduct);


export default router