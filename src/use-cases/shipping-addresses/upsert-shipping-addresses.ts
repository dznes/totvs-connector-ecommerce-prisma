import { OrdersRepository } from '@/repositories/orders-repository'
import { ShippingAddressesRepository } from '@/repositories/shipping-addresses-repository'
import { Address } from '@/http/lib/totvs/interfaces/user-info'

interface UpsertShippingAddressesUseCaseRequest {
  order_code: string
  shipping_address: Address
}

export class UpsertShippingAddressesUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private shippingAddressesRepository: ShippingAddressesRepository,
  ) {}

  async execute({
    order_code,
    shipping_address,
  }: UpsertShippingAddressesUseCaseRequest) {
    const order = await this.ordersRepository.findByCode(order_code)
    const old_shipping_address =
      await this.shippingAddressesRepository.findByOrderCode(order_code)

    if (order && old_shipping_address) {
      await this.shippingAddressesRepository.update({
        ...old_shipping_address,
        updated_at: new Date(),
      })

      console.log(`Order ${order_code} Shipping Address updated.`)
    } else if (order && !old_shipping_address) {
      await this.shippingAddressesRepository.create({
        bcb_country_code: shipping_address.bcbCountryCode ?? 0,
        city: shipping_address.cityName,
        complement: shipping_address.complement,
        country: shipping_address.contryName ?? '',
        neighborhood: shipping_address.neiborhood,
        ibge_city_code: shipping_address.ibgeCityCode,
        number: shipping_address.addressNumber ?? 0,
        order_code: order.code,
        order_id: order.id,
        state: shipping_address.stateAbbreviation,
        status: 200,
        street: shipping_address.address,
        type: shipping_address.addressType,
        zip_code: shipping_address.cep,
      })

      console.log(`Order ${order_code} Shipping Address created.`)
    }
  }
}
