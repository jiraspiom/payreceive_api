import { Hono } from 'hono'
import { PaymentController } from '../controller/paymentController.js'
import { PaymentService } from '../services/paymentService.js'

const payRouter = new Hono()
const paymentService = new PaymentService()
const paymentController = new PaymentController(paymentService)

payRouter.post('/payments', paymentController.create)
payRouter.get('/payments/:id', paymentController.findById)
payRouter.put('/payments/:id', paymentController.update)
payRouter.delete('/payments/:id', paymentController.delete)

export { payRouter }
