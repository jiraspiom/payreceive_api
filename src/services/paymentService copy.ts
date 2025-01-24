import { Status } from '@prisma/client'
import type { PaymentUpdate } from '../interfaces/IPaymentService.js'
import type { IPay, IReceive } from '../interfaces/IPayReceive.js'
import { prisma } from '../lib/db.js'
import type {
  IReceiveService,
  ReceiveUpdate,
} from '../interfaces/IReceiveService.js'

export class ReceiveService implements IReceiveService {
  async create(pay: string, value: number): Promise<string> {
    const paymentData = {
      pay,
      value,
      status: Status.pending,
    }

    const create = await prisma.pay.create({ data: paymentData })

    return create.id
  }

  async findAll(): Promise<IReceive[]> {
    const all = await prisma.receive.findMany()

    if (!all) {
      throw new Error('Recebimentos não encontrado')
    }

    return all
  }

  async findById(Id: string): Promise<IReceive> {
    const receive = await prisma.receive.findUnique({ where: { id: Id } })

    if (!receive) {
      throw new Error('Pagamento não encontrado')
    }
    return receive
  }

  async update(
    Id: string,
    status: 'pending' | 'completed' | 'failed',
    dados: IReceive
  ): Promise<ReceiveUpdate> {
    const receive = await prisma.receive.findUnique({ where: { id: Id } })

    if (!receive) {
      throw new Error('Pagamento não encontrado')
    }

    const updateData: ReceiveUpdate = {
      status,
      updatedAt: new Date(),
    }
    await prisma.pay.update({
      where: { id: receive.id },
      data: {
        pay: dados.receive,
        value: dados.value,
        date: dados.date,
        updatedAt: new Date(),
      },
    })

    return updateData
  }

  async delete(Id: string): Promise<void> {
    const dado = await prisma.receive.findUnique({ where: { id: Id } })

    if (!dado) {
      throw new Error('Recebimento não encontrado')
    }
    await prisma.pay.delete({ where: { id: dado.id } })
  }
}
