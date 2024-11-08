import { Router } from "express";
import fs from 'fs'
import ResponseBuilder from "../builder/response.builder.js";

const userRouter = Router()


userRouter.get('/', async (req, res) => {
    try{
        const data = JSON.parse( await fs.promises.readFile('./public/users.json', {encoding: 'utf-8'}))
    
        // res.status(200).json({
        //     message: 'Success',
        //     payload: JSON.parse(data)
        // })
    
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("succes")
        .setPayload(data)
        .build()
        return res.status(200).send(response)
    } catch(err){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .build()
        return res.status(500).send(response)
    }

})

export default userRouter;