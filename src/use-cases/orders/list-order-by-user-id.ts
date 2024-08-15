import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListOrdersByUserIdUseCaseResponse {
  orders: Order[]
}

export class ListOrdersByUserIdUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(userId: string): Promise<ListOrdersByUserIdUseCaseResponse> {
    const orders = await this.ordersRepository.listByUserId(userId)

    if (!orders) {
      throw new ResourceNotFoundError()
    }

    return { orders }
  }
}
