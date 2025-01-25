import { sendResponse } from '../util/apiResponse.js'
import type { Context } from 'hono'
import type { ILogger } from '../interfaces/ILogger.js'
import type { IPayReceive } from '../interfaces/IPayReceive.js'
import type { IReceiveService } from '../interfaces/IReceiveService.js'

export class ReceiveController {
  private receiveService: IReceiveService
  private logger: ILogger

  constructor(receiveService: IReceiveService, logger: ILogger) {
    this.receiveService = receiveService
    this.logger = logger
  }

  create = async (ctx: Context) => {
    const body = await ctx.req.json<IPayReceive>()
    console.log('okkk', body)

    try {
      this.logger.log('fetching receive create')
      const payid = await this.receiveService.create(body.text, body.value)

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
      this.logger.log(`fetching receive find ID: ${id}`)
      const all = await this.receiveService.findById(id)

      return ctx.json(sendResponse(200, 'Pagamento encontrado', all), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Pagamento não encontrado'), 404)
    }
  }

  findAll = async (ctx: Context) => {
    const mes = await ctx.req.query('mes')
    const ano = await ctx.req.query('ano')

    try {
      this.logger.log('fetching receive All')

      const rec = await this.receiveService.findAll(Number(ano), Number(mes))

      return ctx.json(sendResponse(200, 'receitas encontrada', rec), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Recentas não encontradas'), 404)
    }
  }

  update = async (ctx: Context) => {
    const id = ctx.req.param('id')

    const body = await ctx.req.json<IPayReceive>()

    try {
      this.logger.log(`fetching receive update ID: ${id}`)
      const updated = await this.receiveService.update(id, 'completed', body)

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
      this.logger.log(`fetching receive delete ID: ${id}`)
      await this.receiveService.delete(id)

      return ctx.json(sendResponse(200, 'Pagamento deletado com sucesso'), 200)
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao deletar pagamento'), 500)
    }
  }
}
