import express,{ Router } from 'express'
import ResponseBuilder from '../builder/response.builder.js';

const productRouter = Router()
productRouter.use(express.json())

const productos = [
    {
        id: 1,
        name: 'Pantalon',
        pice: 100,
        imagen: 'https://picsum.photos/id/237/200/300',
        description: 'Pantalon deportivo',
        stock: 10,
        category: "noob",
        activeCategory: true
    },
    {
        id: 2,
        name: 'Camisa',
        pice: 50,
        imagen: 'https://picsum.photos/id/238/200/300',
        description: 'Camisa deportiva',
        stock: 5,
        category: "pro",
        activeCategory: false
    },
    {
        id: 3,
        name: 'Zapatos',
        pice: 200,
        imagen: 'https://picsum.photos/id/239/200/300',
        description: 'Zapatos deportivos',
        stock: 20,
        category: "noob",
        activeCategory: true

    }
]


productRouter.get('/:product_id', (req, res) => {

    try{
    const {product_id} = req.params

    const searchedProduct = productos.find((product) => Number(product_id) === product.id)

    if(!searchedProduct){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(404)
        .build()
        return res.status(404).send("product not found")
    }

    const response = {
        ok: true,
        status: 200,
        payload: {
            message: 'Productos obtenidos',
            producto: searchedProduct
        }
    }
    return res.json(response)
    } catch(err){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .build()
        return res.status(500).send(response)
    }
})

const allowed_categories = {
    "pro": {
        validate: (value) => value && typeof category === 'string' && category.trim() !== '' 
    }, 
    "noob": {
        validate: (value) => value && typeof category === 'string' && category.trim() !== '' 
    }
}

productRouter.get('/', async (req, res) => {

    const {min_price, max_price, category} = req.query

    const activeCategory = productos.filter(function(product){
        return (product.activeCategory === true)
    })

    try{
        const response = new ResponseBuilder()
        .setPayload(activeCategory)
        .build()
        return res.status(200).send(response)
    } catch (err){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .build()
        return res.status(500).send(response)
    }
})

productRouter.post('/', (req, res) => {
    const { name, price, category} = req.body
        const response = new ResponseBuilder()
        .build()
        return res.status(200).send(response)

})

export default productRouter