import { db } from '../config/firebaseConfig.js'
import type {
  IPaymentService,
  Payment,
  PaymentUpdate,
} from '../interfaces/IPaymentService.js'

export class PaymentService implements IPaymentService {
  async create(description: string, amount: number): Promise<string> {
    const paymentRef = db.collection('payments').doc()
    const paymentData = {
      description,
      amount,
      status: 'pending',
      createdAt: new Date(),
    }
    await paymentRef.set(paymentData)
    return paymentRef.id
  }

  async findById(paymentId: string): Promise<Payment> {
    const paymentDoc = await db.collection('payments').doc(paymentId).get()
    if (!paymentDoc.exists) {
      throw new Error('Pagamento não encontrado')
    }
    return paymentDoc.data() as Payment // Fazemos um cast para garantir o tipo
  }

  async update(
    paymentId: string,
    status: 'pending' | 'completed' | 'failed'
  ): Promise<PaymentUpdate> {
    const paymentRef = db.collection('payments').doc(paymentId)

    const paymentDoc = await paymentRef.get()

    if (!paymentDoc.exists) {
      throw new Error('Pagamento não encontrado')
    }

    const updateData: PaymentUpdate = {
      status,
      updatedAt: new Date(),
    }
    await paymentRef.update(updateData)

    return updateData
  }

  async delete(paymentId: string): Promise<void> {
    const paymentRef = db.collection('payments').doc(paymentId)
    const paymentDoc = await paymentRef.get()
    if (!paymentDoc.exists) {
      throw new Error('Pagamento não encontrado')
    }
    await paymentRef.delete()
  }
}
