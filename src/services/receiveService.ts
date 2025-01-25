import { Status } from '@prisma/client'
import type { IPayReceive } from '../interfaces/IPayReceive.js'
import { prisma } from '../lib/db.js'
import type {
  IReceiveService,
  ReceiveUpdate,
} from '../interfaces/IReceiveService.js'

export class ReceiveService implements IReceiveService {
  async create(text: string, value: number): Promise<string> {
    const data = {
      text,
      value,
      status: Status.pending,
    }

    const create = await prisma.receive.create({ data: data })

    return create.id
  }

  async findAll(): Promise<IPayReceive[]> {
    const all = await prisma.receive.findMany()

    if (!all) {
      throw new Error('Recebimentos não encontrado')
    }

    return all
  }

  async findById(Id: string): Promise<IPayReceive> {
    const data = await prisma.receive.findUnique({ where: { id: Id } })

    if (!data) {
      throw new Error('Pagamento não encontrado')
    }
    return data
  }

  async update(
    id: string,
    status: 'pending' | 'completed' | 'failed',
    payrec: IPayReceive
  ): Promise<ReceiveUpdate> {
    const data = await prisma.receive.findUnique({ where: { id: id } })

    if (!data) {
      throw new Error('Pagamento não encontrado')
    }

    const updateData: ReceiveUpdate = {
      status,
      updatedAt: new Date(),
    }
    await prisma.receive.update({
      where: { id: data.id },
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
    const data = await prisma.receive.findUnique({ where: { id: id } })

    if (!data) {
      throw new Error('Recebimento não encontrado')
    }
    await prisma.receive.delete({ where: { id: data.id } })
  }
}
