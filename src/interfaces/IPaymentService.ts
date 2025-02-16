import type { IPayReceive } from './IPayReceive.js'

export interface PaymentUpdate {
  status: 'pending' | 'completed' | 'failed'
  updatedAt: Date
}

export interface IPaymentService {
  create(text: string, value: number): Promise<string | undefined>

  findAll(
    ano?: number,
    mes?: number
  ): Promise<{ data: IPayReceive[]; totalMonth: number }>

  findById(id: string): Promise<IPayReceive>

  update(
    id: string,
    status: 'pending' | 'completed' | 'failed',
    payrec: IPayReceive
  ): Promise<PaymentUpdate>

  delete(id: string): Promise<void>
}
