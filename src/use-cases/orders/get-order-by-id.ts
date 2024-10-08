import { OrdersRepository } from '@/repositories/orders-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Order } from '@prisma/client'

interface GetOrderByIdUseCaseRequest {
  id: string
}

interface GetOrderByIdUseCaseResponse {
  order: Order
}

export class GetOrderByIdUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
  }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
    const order = await this.ordersRepository.getDetailsById(id)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return {
      order,
    }
  }
}
