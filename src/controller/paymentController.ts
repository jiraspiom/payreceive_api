import { sendResponse } from '../util/apiResponse.js'
import type { Context } from 'hono'
import type { IPaymentService } from '../interfaces/IPaymentService.js'

import type { IPayReceive } from '../interfaces/IPayReceive.js'
import type { ILogger } from '../interfaces/ILogger.js'

export class PaymentController {
  private paymentService: IPaymentService
  private logger: ILogger

  constructor(paymentService: IPaymentService, logger: ILogger) {
    this.paymentService = paymentService
    this.logger = logger
  }

  create = async (ctx: Context) => {
    const body = await ctx.req.json<IPayReceive>()

    console.log('okkkPag', body)

    try {
      this.logger.log('fetching payment create')
      const payid = await this.paymentService.create(body.text, body.value)

      return ctx.json(
        sendResponse(201, 'Pagamento criado com sucesso!', { payid }),
        201
      )
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao criar pagamento'), 500)
    }
  }

  findById = async (ctx: Context) => {
    const id = await ctx.req.param('id')

    try {
      this.logger.log(`fetching payment find ID: ${id}`)
      const payment = await this.paymentService.findById(id)

      return ctx.json(sendResponse(200, 'Pagamento encontrado', payment), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Pagamento não encontrado'), 404)
    }
  }

  findAll = async (ctx: Context) => {
    const mes = await ctx.req.query('mes')
    const ano = await ctx.req.query('ano')

    const cDate = new Date()

    try {
      this.logger.log('fetching payment All')

      const all = await this.paymentService.findAll(
        Number(ano) || cDate.getFullYear(),
        Number(mes) || cDate.getMonth() + 1
      )

      return ctx.json(sendResponse(200, 'Pagamento encontrado', all), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Pagamento não encontrado'), 404)
    }
  }

  update = async (ctx: Context) => {
    const id = ctx.req.param('id')

    const body = await ctx.req.json<IPayReceive>()

    try {
      this.logger.log(`fetching payment update ID: ${id}`)
      const updated = await this.paymentService.update(id, 'completed', body)

      return ctx.json(
        sendResponse(200, 'Pagamento atualizado com sucesso', updated),
        200
      )
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao atualizar pagamento'), 500)
    }
  }

  delete = async (ctx: Context) => {
    const id = await ctx.req.param('id')

    try {
      this.logger.log(`fetching payment delete ID: ${id}`)
      await this.paymentService.delete(id)

      return ctx.json(sendResponse(200, 'Pagamento deletado com sucesso'), 200)
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao deletar pagamento'), 500)
    }
  }
}
