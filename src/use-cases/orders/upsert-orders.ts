import { OrdersRepository } from '@/repositories/orders-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Order, OrderItem, OrderInvoice ,EletronicInvoice } from '@/http/lib/totvs/interfaces/orders'
import { Address } from '@/http/lib/totvs/interfaces/user-info'
import { OrderItemsRepository } from '@/repositories/order-items-repository'
import { ShippingAddressesRepository } from '@/repositories/shipping-addresses-repository'
import { OrderInvoicesRepository } from '@/repositories/order-invoices-repository'



interface UpsertOrdersUseCaseRequest {
    code: string
    status: number
    type: number
    items_quantity: number
    total_items: number
    discount_value: number
    total_value: number
    utm_campaign: string | null
    utm_source: string | null
    utm_medium: string | null
    utm_content: string | null
    utm_term: string | null
    fiscal_code: string | null
    gateway_id: string | null
    order_vtex_id: string | null
    totvs_branch_code: number
    totvs_creation_date: Date
    representative_code: string
    representative_name: string
    operation_code: string
    operation_name: string
    payment_condition_code: string
    payment_condition_name: string
    freight_type: number
    freight_value: number
    shipping_company_code: string
    shipping_company_cnpj: string
    shipping_company_name: string
    shipping_service_code: string
    shipping_service_name: string
    totvs_order_status: string
    user_code: string
    order_items: OrderItem[]
    shipping_address: Address
    order_invoice: OrderInvoice
}

export class UpsertOrdersUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
    private orderItemsRepository: OrderItemsRepository,
    private shippingAddressRepository: ShippingAddressesRepository,
    private orderInvoiceRepository: OrderInvoicesRepository
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
    shipping_address,
    order_items,
    order_invoice,
  }: UpsertOrdersUseCaseRequest) {
    const order = await this.ordersRepository.findByCode(code)
    const user = await this.usersRepository.findByCode(user_code)

    // TODO:
    // NEED TO CHECK IF USER IS CREATED, IF NOT NEED TO CREATE ITS ADDRESS AND USER
    // OR JUST CREATE USER AND REGISTER THE SHIPPING ADDRESS
    // AFTER CREATING ORDER NEED TO CREATE ORDER ITEMS, SHIPPING ADDRESS AND ORDER INVOICE

    if (order) {
      await this.ordersRepository.update({
        ...order,
        updated_at: new Date(),
      })
      console.log(`Order ${code} updated.`)
    } else if (user){
      await this.ordersRepository.create({
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
      })
    }
  }
}
