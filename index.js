import express from 'express';
import productRouter from './routes/get-products.js'
import userRouter from './routes/get-users.js'
import productPostRouter from './routes/post-products.js'
import productCutRouter from './routes/put-products.js'
import productDelRouter from './routes/delete-users.js'

// crate an instance of http server
const app = express();
const port = 3000;

app.use('/get-products', productRouter)
app.use('/post-products', productPostRouter)
app.use('/get-users', userRouter)
app.use('/put-products', productCutRouter)
app.use('/app/delete', productDelRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// when i will receive a value a should validate it
// if it is not valid i should return an error

app.listen(3000, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});

// Create async call to solve the concurrency problem