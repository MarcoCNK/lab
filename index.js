import express from 'express';
import productRouter from './routes/get-products.js'
import userRouter from './routes/get-users.js'

// crate an instance of http server
const app = express();
const port = 3000;

app.use('/get-products', productRouter)

app.use('/get-users', userRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// when i will receive a value a should validate it
// if it is not valid i should return an error

app.listen(3000, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});

// Create async call to solve the concurrency problem