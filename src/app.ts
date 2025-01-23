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

const app = new Hono()

app.route('/users', userRoutes(userController))

app.onError(errorHandler(logger))

export { app }
