import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'

interface SearchOrdersUseCaseRequest {
  query: string
  totvsStatus: string
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
    totvsStatus,
    page,
    perPage,
    operationCode,
  }: SearchOrdersUseCaseRequest): Promise<SearchOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.searchMany(
      query,
      totvsStatus,
      operationCode,
      page,
      perPage,
    )
    const count = await this.ordersRepository.count(
      query,
      totvsStatus,
      operationCode,
    )
    const totalPages = Math.ceil(count / perPage)

    return {
      orders,
      count,
      totalPages,
    }
  }
}
