import type { IReceive } from './IPayReceive.js'

export interface ReceiveUpdate {
  status: 'pending' | 'completed' | 'failed'
  updatedAt: Date
}

export interface IReceiveService {
  create(receive: string, value: number): Promise<string>

  findAll(): Promise<IReceive[]>

  findById(Id: string): Promise<IReceive>

  update(
    Id: string,
    status: 'pending' | 'completed' | 'failed',
    dados: IReceive
  ): Promise<ReceiveUpdate>

  delete(Id: string): Promise<void>
}
