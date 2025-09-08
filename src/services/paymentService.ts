import type { IPayReceive } from '../interfaces/IPayReceive.js'
import prisma from '../lib/db.js'
import type {
  IPaymentService,
  PaymentUpdate,
} from '../interfaces/IPaymentService.js'
import { Status } from '@prisma/client'

export class PaymentService implements IPaymentService {
  async create(text: string, value: number): Promise<string | undefined> {
    try {
      const data = {
        text,
        value,
        status: Status.completed,
      }

      const create = await prisma.pay.create({ data: data })

      return create.id
    } catch (error) {
      console.error('error?', error)
    }
  }

  async findAll(
    ano?: number,
    mes?: number
  ): Promise<{ data: IPayReceive[]; totalMonth: number }> {
    const whereClause: { date?: { gte?: Date; lt?: Date } } = {}

    if (ano !== undefined && mes !== undefined) {
      whereClause.date = {
        gte: new Date(ano, mes - 1, 1),
        lt: new Date(ano, mes, 0),
      }
    }

    console.log('whereClause', whereClause)

    const all = await prisma.pay.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    })

    if (!all) {
      throw new Error('Pagamentos não encontrado')
    }

    const totalMonth = all.reduce(
      (sum: number, item: IPayReceive) => sum + (item.value || 0),
      0
    )

    return { totalMonth, data: all }
  }

  async findById(id: string): Promise<IPayReceive> {
    const data = await prisma.pay.findUnique({ where: { id: id } })

    if (!data) {
      throw new Error('Pagamento não encontrado')
    }
    return data
  }

  async update(
    id: string,
    status: 'pending' | 'completed' | 'failed',
    payrec: IPayReceive
  ): Promise<PaymentUpdate> {
    const data = await prisma.pay.findUnique({ where: { id: id } })

    if (!data) {
      throw new Error('Pagamento não encontrado')
    }

    const updateData: PaymentUpdate = {
      status,
      updatedAt: new Date(),
    }
    await prisma.pay.update({
      where: { id: id },
      data: {
        text: payrec.text,
        value: payrec.value,
        date: payrec.date,
        updatedAt: new Date(),
      },
    })

    return updateData
  }

  async delete(id: string): Promise<void> {
    const data = await prisma.pay.findUnique({ where: { id: id } })

    if (!data) {
      throw new Error('Pagamento não encontrado')
    }
    await prisma.pay.delete({ where: { id: data.id } })
  }
}
