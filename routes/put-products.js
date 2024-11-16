import filesystem from 'fs'
import express, {Router} from 'express'
import ResponseBuilder from '../builder/response.builder.js'
import { NOTFOUND } from 'dns'
import { error } from 'console'
// import asd from './public/products.json'

const productCutRouter = Router()
productCutRouter.use(express.json())
const fileJSON = JSON.parse(await filesystem.promises.readFile('./public/products.json', {encoding:'utf-8'}))
const productsJSON = fileJSON.products

productCutRouter.put('/:product_id', async (req, res) => {
    const {product_id} = req.params

    if (!product_id) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage(`The property id invalid`)
        .build()
        return res.status(400).json(response)
    }

    const findProduct = productsJSON.findIndex((products) => Number(product_id) === products.id) 
    
    try{
        if (findProduct === -1){
            const response = new ResponseBuilder()        
            .setStatus(404)
            .setOk(false)
            .setMessage(`The property it's invalid`)
            .build()
            return res.status(404).json(response)
        }
        
        // create a refence
        const elIndicado = productsJSON[findProduct]

        const arrerr = []

        const allowed_properties = {
            'name': {
                validate: (name) => name && typeof name === 'string' && name.trim() !== '',
                error: 'El título debe ser un valor string no vacío'
            },
            'price': {
                validate: (price) => typeof price === 'number' && price > 0,
                error: 'El precio debe ser un número válido mayor a 0'
            },
            'category': {
                validate: (category) => category && typeof category === 'string' && category.trim() !== '',
                error: 'La categoría debe ser un valor string no vacío'
            },
            'stock': {
                validate: (stock) => typeof stock === 'number' && stock >= 0,
                error: 'El stock debe ser un número no negativo'
            },
        }
        
        for(let property in req.body){

            if(property === 'name'){
                let sameName = productsjson.some(product => {
                    return (
                        product.id === Number(product_id)
                        ? false
                        : product.name === req.body[property]
                    )
                })
                if(sameName){
                    const response = new ResponseBuilder()
                    .setOk(false)
                    .setStatus(400)
                    .setMessage(`The property id invalid`)
                    .build()
                    return res.status(400).json(response)
                }
            }
            product[property] = req.body[property]
            
        }
        const prop_value = req.body[property]
            if(!allowed_properties.hasOwnProperty(property)) {    
                arrerr.push(`La propiedad '${property}' no es válida`);

            } else {
                const isValid = allowed_properties[property].validate(prop_value)
                if (!isValid) {
                    arrerr.push(allowed_properties[property].error);
                }
            }
        
        if (arrerr.length > 0) {
                console.log("from arr length")
                const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setPayload({ errors: arrerr })
                .build();
            return res.status(400).json(response);
        }
        
        for (let property in req.body) {
            elIndicado[property] = req.body[property];
        }
        

    await filesystem.promises.writeFile('./public/products.json', JSON.stringify({ ...fileJSON, productsJSON }, null, 2));

        
    const response = new ResponseBuilder()
        .setStatus(200)
        .setPayload( elIndicado )
        .setMessage('El producto ha sido modificado')
        .build()
            return res.status(200).json(response)
    } catch(error){
        console.log(error)
        const response = new ResponseBuilder()
        .setStatus(500)
        .setOk(false)
        .setPayload( error.detail )
        .setMessage({detail : 'Server error'})
        .build()
        return res.status(200).json(response)
    }
})


export default productCutRouter


// for (let propiedad in req.body) {
//     if (!allowed_properties[propiedad]) {
//         const response = new ResponseBuilder()
//         .setOk(false)
//         .setStatus(400)
//         .setMessage(`La propiedad '${propiedad}' no es válida`)
//         .setPayload({ product: null })



//         .build()
//         return res.status(400).json(response)
//     }