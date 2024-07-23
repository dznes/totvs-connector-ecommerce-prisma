import { ShippingAddress, Prisma } from '@prisma/client'

export interface ShippingAddressesRepository {
  findById(id: string): Promise<ShippingAddress | null>
  create(
    data: Prisma.ShippingAddressUncheckedCreateInput,
  ): Promise<ShippingAddress>
  list(): Promise<ShippingAddress[] | null>
  findByOrderId(orderId: string): Promise<ShippingAddress | null>
  findByOrderCode(orderCode: string): Promise<ShippingAddress | null>
  update(ShippingAddress: ShippingAddress): Promise<void>
  updateByOrderCode(ShippingAddress: ShippingAddress): Promise<void>
  updateByOrderId(ShippingAddress: ShippingAddress): Promise<void>
  delete(ShippingAddress: ShippingAddress): Promise<void>
}
