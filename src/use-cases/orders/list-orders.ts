import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListOrdersUseCaseResponse {
  order: Order[]
}

export class ListOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<ListOrdersUseCaseResponse> {
    const order = await this.ordersRepository.list()

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return { order }
  }
}
