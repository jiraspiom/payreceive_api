type Valores = {
  id?: string
  value: number
  status: string //'pending' | 'completed' | 'failed'
  date?: Date
  updateAt?: Date
}

export interface IPayReceive extends Valores {
  text: string
}
