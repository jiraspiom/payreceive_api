import { Hono } from 'hono'
import { ReceiveController } from '../controller/receiveController.js'
import { ConsoleLogger } from '../services/LoggerService.js'
import { ReceiveService } from '../services/receiveService.js'

const recRouter = new Hono()
const logger = new ConsoleLogger()
const service = new ReceiveService()
const controller = new ReceiveController(service, logger)

recRouter.post('/receives', controller.create)
recRouter.get('/receives', controller.findAll)
recRouter.get('/receives/:id', controller.findById)
recRouter.put('/receives/:id', controller.update)
recRouter.delete('/receives/:id', controller.delete)

export { recRouter }
