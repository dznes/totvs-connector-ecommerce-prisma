import { OrderItemsRepository } from '@/repositories/order-items-repository'
import { OrderItem } from '@prisma/client'

interface SearchOrderItemsUseCaseRequest {
  query: string
  totvsStatus: string
  page: number
  perPage: number
  operationCode: string
}

export interface SearchOrderItemsUseCaseResponse {
  orderItems: OrderItem[]
  count: number
  totalPages: number
}

export class SearchOrderItemsUseCase {
  constructor(private orderItemsRepository: OrderItemsRepository) {}

  async execute({
    query,
    totvsStatus,
    page,
    perPage,
    operationCode,
  }: SearchOrderItemsUseCaseRequest): Promise<SearchOrderItemsUseCaseResponse> {
    const orderItems = await this.orderItemsRepository.searchMany(query, totvsStatus, operationCode, page, perPage)
    const count = await this.orderItemsRepository.count(query, totvsStatus, operationCode)
    const totalPages = Math.ceil(count / perPage)

    return {
      orderItems,
      count,
      totalPages,
    }
  }
}
