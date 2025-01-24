type Valores = {
  id?: string
  value: number
  status: 'pending' | 'completed' | 'failed'
  date?: Date
  updateAt?: Date
}

export interface IPay extends Valores {
  pay: string
}

export interface IReceive extends Valores {
  receive: string
}
