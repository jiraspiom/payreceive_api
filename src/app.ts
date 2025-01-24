import { Hono } from 'hono'
import { ConsoleLogger } from './services/LoggerService.js'
import { UserService } from './services/UserService.js'
import { errorHandler } from './middlewares/ErrorHandle.js'
import type { IPay, IReceive } from './interfaces/IPayReceive.js'
import { DataPay, DataReceive } from './util/payrecevierData.js'
import { GearIdAleatorio } from './util/GerarIdAleatorio.js'
import { payRouter } from './routes/paymentRoutes.js'

// Instanciar dependências
const logger = new ConsoleLogger()
const userService = new UserService()

const app = new Hono().basePath('/api')

app.get('/pay', c => {
  const pay = DataPay

  return c.json(pay)
})

app.get('/receive', c => {
  const receive = DataReceive

  return c.json(receive)
})

app.post('/pay', async c => {
  const pay = await c.req.json<IPay>()
  const data = new Date()

  pay.date = data

  DataPay.push({
    id: GearIdAleatorio(),
    pay: pay.pay,
    value: pay.value,
    date: pay.date,
  })

  return c.json({ msg: 'pay insert', pay })
})

app.post('/receive', async c => {
  const receive = await c.req.json<IReceive>()
  const data = new Date()

  receive.date = data

  DataReceive.push({
    id: GearIdAleatorio(),
    receive: receive.receive,
    value: receive.value,
    date: receive.date,
  })

  return c.json({ msg: 'receive insert', receive })
})

app.route('/pa', payRouter)

app.onError(errorHandler(logger))

export { app }
