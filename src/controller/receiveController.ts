import { sendResponse } from '../util/apiResponse.js'
import type { Context } from 'hono'

import type { IPay, IReceive } from '../interfaces/IPayReceive.js'
import type { ILogger } from '../interfaces/ILogger.js'
import type { IReceiveService } from '../interfaces/IReceiveService.js'

export class ReceiveController {
  private receiveService: IReceiveService
  private logger: ILogger

  constructor(receiveService: IReceiveService, logger: ILogger) {
    this.receiveService = receiveService
    this.logger = logger
  }

  create = async (ctx: Context) => {
    const body = await ctx.req.json<IPay>()
    console.log('okkk', body)

    try {
      this.logger.log('fetching user create')
      const payid = await this.receiveService.create(body.pay, body.value)

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
      this.logger.log(`fetching user with ID: ${paymentId}`)
      const payment = await this.receiveService.findById(paymentId)

      return ctx.json(sendResponse(200, 'Pagamento encontrado', payment), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Pagamento não encontrado'), 404)
    }
  }

  findAll = async (ctx: Context) => {
    try {
      this.logger.log('fetching user All')

      const payments = await this.receiveService.findAll()

      return ctx.json(sendResponse(200, 'Pagamento encontrado', payments), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Pagamento não encontrado'), 404)
    }
  }

  update = async (ctx: Context) => {
    const paymentId = ctx.req.param('id')

    const body = await ctx.req.json<IReceive>()

    try {
      this.logger.log(`fetching user with ID: ${paymentId}`)
      const updatedPayment = await this.receiveService.update(
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
      this.logger.log(`fetching user with ID: ${paymentId}`)
      await this.receiveService.delete(paymentId)

      return ctx.json(sendResponse(200, 'Pagamento deletado com sucesso'), 200)
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao deletar pagamento'), 500)
    }
  }
}
