import { Hono } from 'hono'
import { ConsoleLogger } from './services/LoggerService.js'
import { errorHandler } from './middlewares/ErrorHandle.js'
import { payRouter } from './routes/paymentRoutes.js'
import { recRouter } from './routes/receiptRoutes.js'
import { cors } from 'hono/cors'
import { teste } from './routes/teste.js'

// Instanciar dependências
const logger = new ConsoleLogger()

const app = new Hono().basePath('/api')

app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', '*', '0.0.0.0'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: false,
  })
)

app.route('/pay', payRouter)
app.route('/rec', recRouter)
app.route('/teste', teste)

app.onError(errorHandler(logger))

export { app }
