import type { Context } from 'hono'

import type { IUserService } from '../interfaces/IUserService.js'
import type { ILogger } from '../interfaces/ILogger.js'

export class UserController {
  private userService: IUserService
  private logger: ILogger

  constructor(userService: IUserService, logger: ILogger) {
    this.userService = userService
    this.logger = logger
  }

  async getUserById(ctx: Context): Promise<void> {
    console.log('ii')
    const userId = ctx.req.param('id')

    if (!userId) {
      ctx.json({ message: 'User ID is required' }, 400)
      return
    }

    this.logger.log(`fetching user with ID: ${userId}`)
    const user = await this.userService.getUserById(userId)

    if (user) ctx.json(user, 200)

    ctx.json({ message: 'User not found' }, 404)
  }

  async getUser(ctx: Context): Promise<void> {
    this.logger.log('fetching users')

    const user = await this.userService.getUser()

    if (user) ctx.json(user, 200)

    ctx.json({ message: 'User not found' }, 404)
  }
}
