import { OrdersRepository } from '@/repositories/orders-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'

interface ShippingAddress {
  street: string
  zip_code: string
  city: string
  state: string
  country: string
  number: number
  complement?: string
}

interface Items {
  code: string
  amount: number
  description: string
  quantity: number
}

interface CreateOrderWithShippingAddressUseCaseRequest {
  code: string
  status: number
  type: number
  items_quantity: number
  total_items: number
  discount_value: number
  total_value: number
  utm_campaign?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_content?: string | null
  utm_term?: string | null
  fiscal_code?: string | null
  gateway_id: string | null
  arrival_date?: string | null
  order_vtex_id?: string | null
  totvs_branch_code?: number
  totvs_creation_date?: Date
  representative_code?: string
  representative_name?: string
  operation_code?: string
  operation_name?: string
  payment_condition_code?: string
  payment_condition_name?: string
  freight_type: number
  freight_value: number
  shipping_company_code?: string
  shipping_company_cnpj?: string
  shipping_company_name?: string
  shipping_service_code?: string
  shipping_service_name?: string
  totvs_order_status?: string
  user_code: string
  shippingAddress: ShippingAddress
}

export class CreateOrderWithShippingAddressUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    code,
    status,
    type,
    items_quantity,
    total_items,
    discount_value,
    total_value,
    utm_campaign,
    utm_source,
    utm_medium,
    utm_content,
    utm_term,
    fiscal_code,
    gateway_id,
    arrival_date,
    order_vtex_id,
    totvs_branch_code,
    totvs_creation_date,
    representative_code,
    representative_name,
    operation_code,
    operation_name,
    payment_condition_code,
    payment_condition_name,
    freight_type,
    freight_value,
    shipping_company_code,
    shipping_company_cnpj,
    shipping_company_name,
    shipping_service_code,
    shipping_service_name,
    totvs_order_status,
    user_code,
    shippingAddress
  }: CreateOrderWithShippingAddressUseCaseRequest) {
    // Check if user exists
    const user = await this.usersRepository.findByCode(user_code)
    if (!user) {
      console.log(user_code)
      throw new ResourceNotFoundError()
    }

    const orderWithSameCode = await this.ordersRepository.findByCode(code)

    if (orderWithSameCode) {
      throw new ResourceAlreadyExistsError()
    } 

    const order = await this.ordersRepository.create({
      code,
      status,
      type,
      items_quantity,
      total_items,
      discount_value,
      total_value,
      utm_campaign,
      utm_source,
      utm_medium,
      utm_content,
      utm_term,
      fiscal_code,
      gateway_id,
      arrival_date,
      order_vtex_id,
      totvs_branch_code,
      totvs_creation_date,
      representative_code,
      representative_name,
      operation_code,
      operation_name,
      payment_condition_code,
      payment_condition_name,
      freight_type,
      freight_value,
      shipping_company_code,
      shipping_company_cnpj,
      shipping_company_name,
      shipping_service_code,
      shipping_service_name,
      totvs_order_status,
      user_code: user.code,
      user_id: user.id,
      shipping_address: {
        create: {
          zip_code: shippingAddress.zip_code,
          state: shippingAddress.state,
          city: shippingAddress.city,
          street: shippingAddress.street,
          number: shippingAddress.number,
          complement: shippingAddress.complement,
          country: shippingAddress.country,

        }
      }
    })

    return { order }
  }
}
