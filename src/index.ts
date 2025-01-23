import { serve } from '@hono/node-server'
import { app } from './app.js'
import { ConsoleLogger } from './services/LoggerService.js'

const logger = new ConsoleLogger()

const port = 3333
logger.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
