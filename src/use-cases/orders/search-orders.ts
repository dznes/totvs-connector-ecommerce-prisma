import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'

interface SearchOrdersUseCaseRequest {
  query: string
  page: number
  perPage: number
  operationCode: string
}

export interface SearchOrdersUseCaseResponse {
  orders: Order[]
  count: number
  totalPages: number
}

export class SearchOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    query,
    page,
    perPage,
    operationCode,
  }: SearchOrdersUseCaseRequest): Promise<SearchOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.searchMany(query, page, perPage, operationCode)
    const count = await this.ordersRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      orders,
      count,
      totalPages,
    }
  }
}
