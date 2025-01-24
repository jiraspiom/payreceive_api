import { Hono } from 'hono'
import { ReceiveController } from '../controller/receiveController.js'
import { ConsoleLogger } from '../services/LoggerService.js'
import { ReceiveService } from '../services/receiveService.js'

const receiveRouter = new Hono()
const logger = new ConsoleLogger()
const service = new ReceiveService()
const controller = new ReceiveController(service, logger)

receiveRouter.post('/receives', controller.create)
receiveRouter.get('/receives', controller.findAll)
receiveRouter.get('/receives/:id', controller.findById)
receiveRouter.put('/receives/:id', controller.update)
receiveRouter.delete('/receives/:id', controller.delete)

export { receiveRouter }
