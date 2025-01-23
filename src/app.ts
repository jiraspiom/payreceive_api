import { Hono } from 'hono'
import { UserController } from './controller/UserController.js'
import { userRoutes } from './routes/userRoutes.js'
import { ConsoleLogger } from './services/LoggerService.js'
import { UserService } from './services/UserService.js'
import { errorHandler } from './middlewares/ErrorHandle.js'

// Instanciar dependências
const logger = new ConsoleLogger()
const userService = new UserService()
const userController = new UserController(userService, logger)

const app = new Hono().basePath('/api')

app.get('/pay', c => {
  return c.json({ msg: 'play ok' })
})

app.get('/receive', c => {
  return c.json({ msg: 'receive ok' })
})

app.post('/pay', async c => {
  const pay = await c.req.json<Pay>()
  const data = new Date()
  pay.date = data

  return c.json({ msg: 'pay insert', pay })
})

app.post('/receive', async c => {
  const receive = await c.req.json<Receive>()
  const data = new Date()
  receive.date = data

  return c.json({ msg: 'receive insert', receive })
})

app.route('/users', userRoutes(userController))

app.onError(errorHandler(logger))

export { app }

type Valores = {
  value: string
  date?: Date
}

interface Pay extends Valores {
  pay: string
}

interface Receive extends Valores {
  receive: string
}
