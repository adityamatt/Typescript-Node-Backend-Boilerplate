import express from 'express'
import * as http from 'http'
import cors from 'cors'
import { CommonRoutesConfig } from './common/common.routes.config'
import { UsersRoutes } from './common/users.routes.config'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// here we are adding middleware to allow cross-origin requests
app.use(cors())

const port = process.env.PORT || 9000 // default port to listen

// define a route handler for the default home page
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`)
})

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

const routes: CommonRoutesConfig[] = []
routes.push(new UsersRoutes(app))
const server: http.Server = http.createServer(app)
