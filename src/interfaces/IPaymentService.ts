export interface Payment {
  id?: string // Opcional, pois pode ser gerado pelo Firebase
  text: string
  value: number
  status: 'pending' | 'completed' | 'failed'
  createdAt: Date
  updatedAt?: Date // Opcional, pois pode não ser atualizado imediatamente
}

export interface PaymentUpdate {
  status: 'pending' | 'completed' | 'failed'
  updatedAt: Date
}

export interface IPaymentService {
  create(description: string, amount: number): Promise<string>
  findById(paymentId: string): Promise<Payment>
  update(
    paymentId: string,
    status: 'pending' | 'completed' | 'failed'
  ): Promise<PaymentUpdate>
  delete(paymentId: string): Promise<void>
}
