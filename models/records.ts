export type RecordType = {
  id: number,
  is_income: boolean,
  type_id: boolean,
  account_id: number
  user_id: number
  money: number
  date: Date,
  description: string | null
}

export class RecordData {
  constructor (
    private data: RecordType[] = []
  ) {
    this.data = data
  }
  
  public getData(): RecordType[] {
    return this.data
  }

  public getIncomeData(): RecordType[] {
    return this.data.filter((item: any) => item.is_income)
  }

  public getIncomeMoneyTotal(): number {
    const data: number[] = this.getIncomeData().map((item: any) => item.money)

    return data.length <= 0 ? 0
    : data.reduce((accumulator: number, currentValue: number) => accumulator + currentValue)
  }

  public getExpenseData (): RecordType[] {
    return this.data.filter((item: any) => !item.is_income)
  }

  public getExpenseMoneyTotal(): number {
    const data: number[] = this.getExpenseData().map((item: any) => item.money)
    
    return data.length <= 0 ? 0
    : data.reduce((accumulator: number, currentValue: number) => accumulator + currentValue)
  }
}
