import { OrdersRepository } from '@/repositories/orders-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import {
  Order,
  OrderItem,
  ShippingAddress,
  Phone,
  Transaction,
  User,
} from '@prisma/client'

interface GetOrderInformationUseCaseRequest {
  id: string
}

// export interface OrderWithRelatedInfo extends Order {
//   order_items?: OrderItem[]
//   shipping_address?: ShippingAddress | null
//   phone?: Phone | null
//   transactions?: Transaction[] | null
//   user: User
// }

interface GetOrderInformationUseCaseResponse {
  order: Order
}

export class GetOrderInformationUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
  }: GetOrderInformationUseCaseRequest): Promise<GetOrderInformationUseCaseResponse> {
    const order = await this.ordersRepository.getDetailsById(id)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return {
      order,
    }
  }
}
