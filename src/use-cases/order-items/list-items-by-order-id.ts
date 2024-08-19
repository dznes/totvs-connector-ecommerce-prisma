import { OrderItem } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { OrderItemsRepository } from '@/repositories/order-items-repository'

interface ListItemsByOrderIdUseCaseResponse {
  orderItems: OrderItem[]
}

export class ListItemsByOrderIdUseCase {
  constructor(private orderItemsRepository: OrderItemsRepository) {}

  async execute(orderId: string): Promise<ListItemsByOrderIdUseCaseResponse> {
    const orderItems = await this.orderItemsRepository.listByOrderId(orderId)

    if (!orderItems) {
      throw new ResourceNotFoundError()
    }

    return { orderItems }
  }
}
