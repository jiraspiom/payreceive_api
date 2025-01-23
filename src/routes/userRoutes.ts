import { Hono } from 'hono'
import type { UserController } from '../controller/UserController.js'

export const userRoutes = (userController: UserController): Hono => {
  const router = new Hono()

  // Definir rotas para usuários
  router.get('/:id', ctx => userController.getUserById(ctx))
  router.get('/', ctx => userController.getUser(ctx))

  return router
}
