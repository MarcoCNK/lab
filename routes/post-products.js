import filesystem from 'fs'
import express, {Router} from 'express'
import ResponseBuilder from '../builder/response.builder.js'
// import asd from './public/products.json'

const productPostRouter = Router()
productPostRouter.use(express.json())


productPostRouter.post('/', async (req, res) => {
    try {
        const { name, price, category, stock } = req.body
        const categoriasValidas = ['baby', 'pro', 'noob']

        // Vamos a optimizar el uso de ResponseBuilder() distinto de como lo usamos en el get, mejorado
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)

        const erroresValidacion = []

        if (!name || typeof name !== 'string' || name.trim() === '') {
            erroresValidacion.push( 'el título es inválido')
        }    
        if (typeof price !== 'number' || price <= 0) {
            erroresValidacion.push( 'el precio es inválido')
        }
        if (!categoriasValidas.includes(category)) {
            erroresValidacion.push( 'la categoría es inválida')
        }
        if (typeof stock !== 'number' || stock < 0) {
            erroresValidacion.push( 'el stock es inválido')
        } 
        if (erroresValidacion.length > 0){
            let errorMensaje   = `Errores de validación: \n` + erroresValidacion.join('\n-')

            response 
            .setMessage(errorMensaje)
            .build()

            return res.status(400).json(response)
        }   

        
        
        const data = await filesystem.promises.readFile('./public/products.json', {encoding: 'utf-8'})
        const parsedData = JSON.parse(data)
        const products = parsedData.products
        let id_counter = parsedData.id_counter
        const exists = products.some(product => product.name ===name)

        console.log("Estos son los products", products)
        console.log('estos son los products' , products)
        if (exists) {
            response
            .setStatus(400)
            .setOk(false)
            .setMessage('El producto ya existe')
            .build()
            return res.status(400).json(response)
        }
        const newProduct = {
            id: id_counter++,
            name,
            price,
            category,
            stock,
            active: true
        }
        products.push(newProduct)
        await filesystem.promises.writeFile('./public/products.json', JSON.stringify({ id_counter, products }), 'utf-8')

        response
            .setOk(true)
            .setStatus(201)
            .setMessage('Producto creado')
            .setPayload({ products })
            .build()
        res.status(201).json(response)
        
    }catch(error){
        console.error(error)
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Error al crear el producto')
            .setPayload({ error: error.message })
            .build() 
        res.status(500).json(response)    
    }
})


export default productPostRouter