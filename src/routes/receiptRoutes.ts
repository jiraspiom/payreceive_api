import { Hono } from 'hono'
import { ConsoleLogger } from '../services/LoggerService.js'
import { ReceiveService } from '../services/paymentService copy.js'
import { ReceiveController } from '../controller/receiveController.js'

const payRouter = new Hono()
const logger = new ConsoleLogger()
const service = new ReceiveService()
const controller = new ReceiveController(service, logger)

payRouter.post('/receives', controller.create)
payRouter.get('/receives', controller.findAll)
payRouter.get('/receives/:id', controller.findById)
payRouter.put('/receives/:id', controller.update)
payRouter.delete('/receives/:id', controller.delete)

export { payRouter }
