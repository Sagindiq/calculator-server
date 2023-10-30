import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import { dataSource } from './config/ormconfig'
import { errorHandle } from './middlewares/error.middleware'
import router from './routes/router'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 9000

dataSource.initialize().then(() => console.log('Connected'))

app.use(cors())

app.use(express.json())

app.use(router)

app.use(errorHandle)

app.all('/*', (req: Request, res: Response, next: NextFunction) => res.sendStatus(404))

app.listen(PORT, (): void => {
    console.log(PORT)
})