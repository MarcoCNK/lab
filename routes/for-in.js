productRouter.put('/:product_id', async (req, res) => {
    try {
        const { product_id } = req.params;
        const { title, price, stock, categoria } = req.body;

        const data = await filesystem.promises.readFile('./data/products.json', { encoding: 'utf-8' });
        const parsedData = JSON.parse(data);
        const products = parsedData.products;

        // Buscar el producto por ID
        const productIndex = products.findIndex(product => product.id === parseInt(product_id));
        if (productIndex === -1) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setMessage('Producto no encontrado')
                .setStatus(404)
                .setPayload({ product: null })
                .build();
            return res.status(404).json(response);
        }

        // Validar las propiedades que llegan en `req.body`
        const propiedades_permitidas = {
            'title': {
                validate: (value) => value && typeof value === 'string' && value.trim() !== '',
                error: 'El título debe ser un valor string no vacío'
            },
            'price': {
                validate: (value) => typeof value === 'number' && value > 0,
                error: 'El precio debe ser un número válido mayor a 0'
            },
            'stock': {
                validate: (value) => typeof value === 'number' && value >= 0,
                error: 'El stock debe ser un número no negativo'
            },
            'categoria': {
                validate: (value) => value && typeof value === 'string' && value.trim() !== '',
                error: 'La categoría debe ser un valor string no vacío'
            }
        };
        for (let propiedad in req.body) {
            if (!propiedades_permitidas[propiedad]) {
                const response = new ResponseBuilder()
                    .setOk(false)
                    .setStatus(400)
                    .setMessage(`La propiedad '${propiedad}' no es válida`)
                    .setPayload({ product: null })
                    .build();
                return res.status(400).json(response);
            }

            if (!propiedades_permitidas[propiedad].validate(req.body[propiedad])) {
                const response = new ResponseBuilder()
                    .setOk(false)
                    .setStatus(400)
                    .setMessage(propiedades_permitidas[propiedad].error)
                    .setPayload({ product: null })
                    .build();
                return res.status(400).json(response);
            }
        }

        for (let propiedad in req.body) {
            if (!propiedades_permitidas[propiedad]) {
                return res.status(400).json({ ok: false, message: `La propiedad '${propiedad}' no es válida` });
            }
            if (!propiedades_permitidas[propiedad].validate(req.body[propiedad])) {
                return res.status(400).json({ ok: false, message: propiedades_permitidas[propiedad].error });
            }
        }

        // Actualizar las propiedades del producto
        for (let propiedad in req.body) {
            if (req.body[propiedad] !== undefined) {
                products[productIndex][propiedad] = req.body[propiedad];
            }
        }

        // Guardar cambios en `products.json`
        await filesystem.promises.writeFile('./data/products.json', JSON.stringify({ ...parsedData, products }, null, 2));

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Producto actualizado')
            .setPayload({ product: products[productIndex] })
            .build();
        return res.status(200).json(response);

    } catch (error) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Error al actualizar el producto')
            .setPayload({ error: error.message })
            .build();
        return res.status(500).json(response);
    }
});

export default productRouter;