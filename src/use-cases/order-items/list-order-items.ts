import { OrderItemsRepository } from '@/repositories/order-items-repository'
import { OrderItem } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListOrderItemsUseCaseResponse {
  orderItems: OrderItem[]
}

export class ListOrderItemsUseCase {
  constructor(private orderItemsRepository: OrderItemsRepository) {}

  async execute(): Promise<ListOrderItemsUseCaseResponse> {
    const orderItems = await this.orderItemsRepository.list()

    if (!orderItems) {
      throw new ResourceNotFoundError()
    }

    return { orderItems }
  }
}
