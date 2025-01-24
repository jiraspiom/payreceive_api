import { sendResponse } from '../util/apiResponse.js'
import type { Context } from 'hono'
import type { IPaymentService } from '../interfaces/IPaymentService.js'

export class PaymentController {
  private paymentService: IPaymentService

  constructor(paymentService: IPaymentService) {
    this.paymentService = paymentService
  }

  create = async (ctx: Context) => {
    const pay = await ctx.req.json<pay>()
    console.log('okkk', pay)

    try {
      const payid = await this.paymentService.create(pay.pay, pay.value)

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
      const payment = await this.paymentService.findById(paymentId)

      return ctx.json(sendResponse(200, 'Pagamento encontrado', payment), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Pagamento não encontrado'), 404)
    }
  }

  update = async (ctx: Context) => {
    const paymentId = ctx.req.param('id')
    const status = await ctx.req.json()
    try {
      const updatedPayment = await this.paymentService.update(paymentId, status)
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
      await this.paymentService.delete(paymentId)
      return ctx.json(sendResponse(200, 'Pagamento deletado com sucesso'), 200)
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao deletar pagamento'), 500)
    }
  }
}

type pay = {
  pay: string
  value: number
}
