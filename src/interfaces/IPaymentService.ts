import type { IPay } from './IPayReceive.js'

export interface PaymentUpdate {
  status: 'pending' | 'completed' | 'failed'
  updatedAt: Date
}

export interface IPaymentService {
  create(pay: string, value: number): Promise<string>

  findAll(): Promise<IPay[]>

  findById(payId: string): Promise<IPay>

  update(
    paymentId: string,
    status: 'pending' | 'completed' | 'failed',
    dados: IPay
  ): Promise<PaymentUpdate>

  delete(paymentId: string): Promise<void>
}
