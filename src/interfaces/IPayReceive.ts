type Valores = {
  id: string
  value: string
  date?: Date
}

export interface IPay extends Valores {
  pay: string
}

export interface IReceive extends Valores {
  receive: string
}
