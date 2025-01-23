import type { IUserService } from '../interfaces/IUserService.js'

export class UserService implements IUserService {
  private users = [
    { id: '1', name: 'nome 01' },
    { id: '2', name: 'nome 02' },
  ]
  async getUserById(id: string): Promise<{ id: string; name: string } | null> {
    console.log('achou')
    return this.users.find(user => user.id === id) || null
  }

  async getUser(): Promise<{ id: string; name: string }[] | null> {
    return this.users
  }
}
