import { Status } from '@prisma/client'
import type {
  IPaymentService,
  PaymentUpdate,
} from '../interfaces/IPaymentService.js'
import type { IPay } from '../interfaces/IPayReceive.js'
import { prisma } from '../lib/db.js'

export class PaymentService implements IPaymentService {
  async create(pay: string, value: number): Promise<string> {
    const paymentData = {
      pay,
      value,
      status: Status.pending,
    }

    const create = await prisma.pay.create({ data: paymentData })

    return create.id
  }

  async findAll(): Promise<IPay[]> {
    const all = await prisma.pay.findMany()

    if (!all) {
      throw new Error('Pagamentos não encontrado')
    }

    return all
  }

  async findById(paymentId: string): Promise<IPay> {
    const pay = await prisma.pay.findUnique({ where: { id: paymentId } })

    if (!pay) {
      throw new Error('Pagamento não encontrado')
    }
    return pay
  }

  async update(
    paymentId: string,
    status: 'pending' | 'completed' | 'failed',
    dados: IPay
  ): Promise<PaymentUpdate> {
    const pay = await prisma.pay.findUnique({ where: { id: paymentId } })

    if (!pay) {
      throw new Error('Pagamento não encontrado')
    }

    const updateData: PaymentUpdate = {
      status,
      updatedAt: new Date(),
    }
    await prisma.pay.update({
      where: { id: pay.id },
      data: {
        pay: dados.pay,
        value: dados.value,
        date: dados.date,
        updatedAt: new Date(),
      },
    })

    return updateData
  }

  async delete(paymentId: string): Promise<void> {
    const payment = await prisma.pay.findUnique({ where: { id: paymentId } })

    if (!payment) {
      throw new Error('Pagamento não encontrado')
    }
    await prisma.pay.delete({ where: { id: payment.id } })
  }
}
