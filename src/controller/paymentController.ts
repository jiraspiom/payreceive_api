import { sendResponse } from '../util/apiResponse.js'
import type { Context } from 'hono'
import type { IPaymentService } from '../interfaces/IPaymentService.js'

import type { IPay } from '../interfaces/IPayReceive.js'
import type { ILogger } from '../interfaces/ILogger.js'

export class PaymentController {
  private paymentService: IPaymentService
  private logger: ILogger

  constructor(paymentService: IPaymentService, logger: ILogger) {
    this.paymentService = paymentService
    this.logger = logger
  }

  create = async (ctx: Context) => {
    const body = await ctx.req.json<IPay>()
    console.log('okkk', body)

    try {
      this.logger.log('fetching payment create')
      const payid = await this.paymentService.create(body.pay, body.value)

      return ctx.json(
        sendResponse(201, 'Pagamento criado com sucesso!', { payid }),
        201
      )
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao criar pagamento'), 500)
    }
  }

  findById = async (ctx: Context) => {
    const paymentId = await ctx.req.param('id')

    try {
      this.logger.log(`fetching payment find ID: ${paymentId}`)
      const payment = await this.paymentService.findById(paymentId)

      return ctx.json(sendResponse(200, 'Pagamento encontrado', payment), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Pagamento não encontrado'), 404)
    }
  }

  findAll = async (ctx: Context) => {
    try {
      this.logger.log('fetching payment All')

      const payments = await this.paymentService.findAll()

      return ctx.json(sendResponse(200, 'Pagamento encontrado', payments), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Pagamento não encontrado'), 404)
    }
  }

  update = async (ctx: Context) => {
    const paymentId = ctx.req.param('id')

    const body = await ctx.req.json<IPay>()

    try {
      this.logger.log(`fetching payment update ID: ${paymentId}`)
      const updatedPayment = await this.paymentService.update(
        paymentId,
        'completed',
        body
      )

      return ctx.json(
        sendResponse(200, 'Pagamento atualizado com sucesso', updatedPayment),
        200
      )
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao atualizar pagamento'), 500)
    }
  }

  delete = async (ctx: Context) => {
    const paymentId = await ctx.req.param('id')

    try {
      this.logger.log(`fetching payment delete ID: ${paymentId}`)
      await this.paymentService.delete(paymentId)

      return ctx.json(sendResponse(200, 'Pagamento deletado com sucesso'), 200)
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao deletar pagamento'), 500)
    }
  }
}
