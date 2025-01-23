export interface IUserService {
  getUserById: (id: string) => Promise<{ id: string; name: string } | null>
  getUser: () => Promise<{ id: string; name: string }[] | null>
}
