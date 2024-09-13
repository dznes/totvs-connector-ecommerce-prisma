import { OrdersRepository, SalesByDay } from '@/repositories/orders-repository'


interface GetSalesByDayUseCaseRequest {
  startDate: Date
  endDate: Date
}

interface GetSalesByDayUseCaseResponse {
  result: SalesByDay[]
}

export class GetSalesByDayUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ startDate, endDate }: GetSalesByDayUseCaseRequest): Promise<GetSalesByDayUseCaseResponse> {
    const result = await this.ordersRepository.getSalesByDayAndOperationCode(startDate, endDate)
    console.log(result)

    return { result }
  }
}