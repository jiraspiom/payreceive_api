import { serve } from '@hono/node-server'
import { app } from './app.js'
import { ConsoleLogger } from './services/LoggerService.js'

const logger = new ConsoleLogger()

app.get('/pay', c => {
  return c.json({ msg: 'play ok' })
})
app.get('/receive', c => {
  return c.json({ msg: 'receive ok' })
})

const port = 3333
logger.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
