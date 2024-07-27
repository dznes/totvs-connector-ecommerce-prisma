import { OrderItemsRepository } from '@/repositories/order-items-repository'
import { OrdersRepository } from '@/repositories/orders-repository'

import { convertToDecimal } from '@/core/entities/value-objects/convert-to-decimal'

interface UpsertOrderItemsUseCaseRequest {
  product_code: string
  product_name: string
  product_reference_code: string
  product_reference_name: string
  product_sku_code: string
  color_code: string
  color_name: string
  size_name: string
  to_settle_quantity: number
  settled_quantity: number
  canceled_quantity: number
  extra_quantity: number
  pending_quantity: number
  original_price: number
  price: number
  discount_percentage: number
  totvs_created_at: Date
  totvs_updated_at: Date
  order_code: string
}

export class UpsertOrderItemsUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository,
  ) {}

  async execute({
    product_code,
    product_name,
    product_reference_code,
    product_reference_name,
    product_sku_code,
    color_code,
    color_name,
    size_name,
    to_settle_quantity,
    settled_quantity,
    canceled_quantity,
    extra_quantity,
    pending_quantity,
    original_price,
    price,
    discount_percentage,
    totvs_created_at,
    totvs_updated_at,
    order_code,
  }: UpsertOrderItemsUseCaseRequest) {
    const order = await this.ordersRepository.findByCode(order_code)
    const orderItem =
      await this.orderItemsRepository.findByOrderCodeProductCode(
        order_code,
        product_code,
      )

    if (order && orderItem) {
      await this.orderItemsRepository.update({
        ...orderItem,
        product_code,
        product_name,
        product_reference_code,
        product_reference_name,
        product_sku_code,
        color_code,
        color_name,
        size_name,
        to_settle_quantity,
        settled_quantity,
        canceled_quantity,
        extra_quantity,
        pending_quantity,
        original_price: convertToDecimal(original_price),
        price: convertToDecimal(price),
        discount_percentage,
        totvs_created_at: new Date(totvs_created_at),
        totvs_updated_at: new Date(totvs_updated_at),
        order_code,
        order_id: order.id,
        updated_at: new Date(),
      })
    } else if (order) {
      await this.orderItemsRepository.create({
        product_code,
        product_name,
        product_reference_code,
        product_reference_name,
        product_sku_code,
        color_code,
        color_name,
        size_name,
        to_settle_quantity,
        settled_quantity,
        canceled_quantity,
        extra_quantity,
        pending_quantity,
        original_price: convertToDecimal(original_price),
        price: convertToDecimal(price),
        discount_percentage,
        totvs_created_at: new Date(totvs_created_at),
        totvs_updated_at: new Date(totvs_updated_at),
        order_code,
        order_id: order.id,
      })
    }
  }
}
