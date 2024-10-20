import { OrderItemsRepository } from '@/repositories/order-items-repository'
import { OrdersRepository } from '@/repositories/orders-repository'

import { convertToDecimal } from '@/core/entities/value-objects/convert-to-decimal'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { SkusRepository } from '@/repositories/skus-repository'
import { ColorsRepository } from '@/repositories/colors-repository'

interface CreateOrderItemUseCaseRequest {
  sku_code: string
  quantity: number
  price: number
  order_code: string
}

export class CreateOrderItemUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository,
    private skusRepository: SkusRepository,
    private colorsRepository: ColorsRepository,
  ) {}

  async execute({
    sku_code,
    quantity,
    price,
    order_code,
  }: CreateOrderItemUseCaseRequest) {
    // Check if the order exists
    const order = await this.ordersRepository.findByCode(order_code)
    if (!order) {
      throw new ResourceNotFoundError()
    }

    const sku = await this.skusRepository.findByCode(sku_code)

    if (!sku) {
      throw new ResourceNotFoundError()
    }

    const color = await this.colorsRepository.findByCode(sku.color_code)
    if (!color) {
      throw new ResourceNotFoundError()
    }

    const order_item = await this.orderItemsRepository.create({
      product_code: sku.reference_id ?? '',
      product_name: sku.title,
      product_reference_code: sku.integration_code ?? '',
      product_reference_name: sku.reference_name ?? '',
      product_sku_code: sku.code,
      color_code: sku.color_code,
      color_name: color.title,
      size_name: sku.size_code,
      to_settle_quantity: quantity,
      settled_quantity: 0,
      canceled_quantity: 0,
      extra_quantity: 0,
      pending_quantity: quantity,
      original_price: sku.price_wholesale,
      price: convertToDecimal(price),
      discount_percentage: 0,
      totvs_created_at: order.totvs_creation_date,
      order_code,
      order_id: order.id,
    })
    return { order_item }
  }
}
