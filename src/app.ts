import { Hono } from 'hono'
import { ConsoleLogger } from './services/LoggerService.js'
import { errorHandler } from './middlewares/ErrorHandle.js'
import { payRouter } from './routes/paymentRoutes.js'
import { receiveRouter } from './routes/receiptRoutes.js'

// Instanciar dependências
const logger = new ConsoleLogger()

const app = new Hono().basePath('/api')

app.route('/pay', payRouter)
app.route('/rec', receiveRouter)

app.onError(errorHandler(logger))

export { app }
