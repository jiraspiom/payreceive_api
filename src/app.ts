import { Hono } from 'hono'
import { ConsoleLogger } from './services/LoggerService.js'
import { errorHandler } from './middlewares/ErrorHandle.js'
import { payRouter } from './routes/paymentRoutes.js'

// Instanciar dependências
const logger = new ConsoleLogger()

const app = new Hono().basePath('/api')

app.route('/pay', payRouter)
app.route('/receive', payRouter)

app.onError(errorHandler(logger))

export { app }
