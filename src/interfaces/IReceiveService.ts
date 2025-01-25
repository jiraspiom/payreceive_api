import type { IPayReceive } from './IPayReceive.js'

export interface ReceiveUpdate {
  status: 'pending' | 'completed' | 'failed'
  updatedAt: Date
}

export interface IReceiveService {
  create(text: string, value: number): Promise<string>

  findAll(ano?: number, mes?: number): Promise<IPayReceive[]>

  findById(id: string): Promise<IPayReceive>

  update(
    id: string,
    status: 'pending' | 'completed' | 'failed',
    payrec: IPayReceive
  ): Promise<ReceiveUpdate>

  delete(id: string): Promise<void>
}
