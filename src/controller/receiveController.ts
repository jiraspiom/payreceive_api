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
    try {
      this.logger.log('fetching receive create')
      const payid = await this.receiveService.create(body.text, body.value)

      return ctx.json(
        sendResponse(201, 'Recebimento criado com sucesso!', { payid }),
        201
      )
    } catch (error) {
      return ctx.json(
        sendResponse(500, 'Erro ao criar recebimento', error),
        500
      )
    }
  }

  findById = async (ctx: Context) => {
    const id = await ctx.req.param('id')
    try {
      this.logger.log(`fetching receive find ID: ${id}`)
      const data = await this.receiveService.findById(id)

      return ctx.json(sendResponse(200, 'Recebimento encontrado', data), 200)
    } catch (error) {
      return ctx.json(sendResponse(404, 'Recebimento não encontrado'), 404)
    }
  }

  findAll = async (ctx: Context) => {
    const mes = await ctx.req.query('mes')
    const ano = await ctx.req.query('ano')

    const cDate = new Date()

    try {
      this.logger.log(`fetching receive All ${mes} ${ano}`)
      const data = await this.receiveService.findAll(
        Number(ano) || cDate.getFullYear(),
        Number(mes) || cDate.getMonth() + 1
      )

      return ctx.json(sendResponse(200, 'receitas encontrada', data), 200)
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
        sendResponse(200, 'Recebimento atualizado com sucesso', updated),
        200
      )
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao atualizar recebimento'), 500)
    }
  }

  delete = async (ctx: Context) => {
    const id = await ctx.req.param('id')

    try {
      this.logger.log(`fetching receive delete ID: ${id}`)
      await this.receiveService.delete(id)

      return ctx.json(sendResponse(200, 'Pagamento deletado com sucesso'), 200)
    } catch (error) {
      return ctx.json(sendResponse(500, 'Erro ao deletar recebimento'), 500)
    }
  }
}
