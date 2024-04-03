

import express from 'express'
import BrandRouter from './src/Routers/brand.routers.ts';
import ConnectToDB from "./DB/db.connection.ts";
import  dotenv  from 'dotenv';

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/brands',BrandRouter)







ConnectToDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



