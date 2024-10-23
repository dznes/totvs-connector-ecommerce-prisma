import { Order } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { OrdersRepository } from '@/repositories/orders-repository'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'

export interface UpdateOrderCodeUseCaseRequest {
  id: string
  code: string
}

export interface UpdateOrderCodeUseCaseResponse {
  order: Order
}

export class UpdateOrderCodeUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
    code,
  }: UpdateOrderCodeUseCaseRequest): Promise<UpdateOrderCodeUseCaseResponse> {
    const orderExists = await this.ordersRepository.findById(id)
    const orderWithSameOrderCode = await this.ordersRepository.findByCode(code)

    if (!orderExists) {
      throw new ResourceNotFoundError()
    }

    if (orderWithSameOrderCode) {
      throw new ResourceAlreadyExistsError()
    }

    const order = {
      ...orderExists,
      code,
      status: 200,
      updated_at: new Date(),
    }

    await this.ordersRepository.update(order)

    return {
      order,
    }
  }
}
