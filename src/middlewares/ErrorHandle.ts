import type { Context } from 'hono'
import type { ILogger } from '../interfaces/ILogger.js'

export const errorHandler = (logger: ILogger) => (err: Error, ctx: Context) => {
  logger.log(`Error: ${err.message}`)

  return ctx.json({ message: 'Internal Server Error' }, 500)
}
