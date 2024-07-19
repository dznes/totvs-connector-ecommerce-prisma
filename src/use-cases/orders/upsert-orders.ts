import { OrdersRepository } from '@/repositories/orders-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Order, OrderItem, OrderInvoice ,EletronicInvoice } from '@/http/lib/totvs/interfaces/orders'
import { Address } from '@/http/lib/totvs/interfaces/user-info'
import { OrderItemsRepository } from '@/repositories/order-items-repository'
import { ShippingAddressesRepository } from '@/repositories/shipping-addresses-repository'
import { OrderInvoicesRepository } from '@/repositories/order-invoices-repository'

import { convertToDecimal } from '@/core/entities/value-objects/convert-to-decimal'

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
    private shippingAddressRepository: ShippingAddressesRepository,
    private orderInvoiceRepository: OrderInvoicesRepository,
    private orderItemsRepository: OrderItemsRepository,
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
    const old_shipping_address = await this.shippingAddressRepository.findByOrderCode(code)

    // TODO:
    // AFTER CREATING ORDER NEED TO CREATE ORDER ITEMS, SHIPPING ADDRESS AND ORDER INVOICE

    if (order && old_shipping_address) {
      await this.ordersRepository.update({
        ...order,
        updated_at: new Date(),
      })
      
      await this.shippingAddressRepository.update({
        id: old_shipping_address.id,
        bcb_country_code: shipping_address.bcbCountryCode,
        city: shipping_address.cityName,
        complement: shipping_address.complement,
        country: shipping_address.contryName,
        neighborhood: shipping_address.neiborhood,
        ibge_city_code: shipping_address.ibgeCityCode,
        number: shipping_address.addressNumber ?? 0,
        order_code: code,
        order_id: order.id,
        state: shipping_address.stateAbbreviation,
        status: 200,
        street: shipping_address.address,
        type: shipping_address.addressType,
        zip_code: shipping_address.cep,
        created_at: old_shipping_address.created_at,
        updated_at: new Date(),
      })

      const old_order_invoice = await this.orderInvoiceRepository.findByCode(code)
      if (old_order_invoice) {
        await this.orderInvoiceRepository.update({
            id: old_order_invoice.id,
            code: order_invoice.code.toString(),
            access_key: order_invoice.accessKey,
            serial: order_invoice.serial,
            tracking_code: order_invoice.trackingCode,
            shipping_company_name: order_invoice.shippingCompanyName,
            issue_date: order_invoice.issueDate,
            net_weight: order_invoice.netWeight,
            gross_weight: order_invoice.grossWeight,
            package_number: order_invoice.packageNumber,
            quantity: order_invoice.quantity,
            discount_percentage: order_invoice.discountPercentage,
            additional_value: convertToDecimal(order_invoice.additionalValue),
            product_value: convertToDecimal(order_invoice.productValue),
            shipping_value: convertToDecimal(order_invoice.shippingValue),
            insurance_value: convertToDecimal(order_invoice.InsuranceValue),
            ipi_value: convertToDecimal(order_invoice.ipiValue),
            total_value: convertToDecimal(order_invoice.totalValue),
            transaction_branch_code: order_invoice.transactionBranchCode.toString(),
            transaction_code: order_invoice.transactionCode.toString(),
            transaction_date: order_invoice.transactionDate,
            status: order_invoice.status,
            order_code: code,
            order_id: order.id,
            created_at: old_order_invoice.created_at,
            updated_at: new Date(),
        })
      } else {
        await this.orderInvoiceRepository.create({
            code: order_invoice.code.toString(),
            access_key: order_invoice.accessKey,
            serial: order_invoice.serial,
            tracking_code: order_invoice.trackingCode,
            shipping_company_name: order_invoice.shippingCompanyName,
            issue_date: order_invoice.issueDate,
            net_weight: order_invoice.netWeight,
            gross_weight: order_invoice.grossWeight,
            package_number: order_invoice.packageNumber,
            quantity: order_invoice.quantity,
            discount_percentage: order_invoice.discountPercentage,
            additional_value: convertToDecimal(order_invoice.additionalValue),
            product_value: convertToDecimal(order_invoice.productValue),
            shipping_value: convertToDecimal(order_invoice.shippingValue),
            insurance_value: convertToDecimal(order_invoice.InsuranceValue),
            ipi_value: convertToDecimal(order_invoice.ipiValue),
            total_value: convertToDecimal(order_invoice.totalValue),
            transaction_branch_code: order_invoice.transactionBranchCode.toString(),
            transaction_code: order_invoice.transactionCode.toString(),
            transaction_date: order_invoice.transactionDate,
            status: order_invoice.status,
            order_code: code,
            order_id: order.id,
        })
      }

      console.log(`Order ${code} updated.`)
    } else if (user){
      const created_order = await this.ordersRepository.create({
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

      await this.shippingAddressRepository.create({
        bcb_country_code: shipping_address.bcbCountryCode,
        city: shipping_address.cityName,
        complement: shipping_address.complement,
        country: shipping_address.contryName,
        neighborhood: shipping_address.neiborhood,
        ibge_city_code: shipping_address.ibgeCityCode,
        number: shipping_address.addressNumber ?? 0,
        order_code: created_order.code,
        order_id: created_order.id,
        state: shipping_address.stateAbbreviation,
        status: 200,
        street: shipping_address.address,
        type: shipping_address.addressType,
        zip_code: shipping_address.cep,
      })

      await this.orderInvoiceRepository.create({
        code: order_invoice.code.toString(),
        access_key: order_invoice.accessKey,
        serial: order_invoice.serial,
        tracking_code: order_invoice.trackingCode,
        shipping_company_name: order_invoice.shippingCompanyName,
        issue_date: order_invoice.issueDate,
        net_weight: order_invoice.netWeight,
        gross_weight: order_invoice.grossWeight,
        package_number: order_invoice.packageNumber,
        quantity: order_invoice.quantity,
        discount_percentage: order_invoice.discountPercentage,
        additional_value: convertToDecimal(order_invoice.additionalValue),
        product_value: convertToDecimal(order_invoice.productValue),
        shipping_value: convertToDecimal(order_invoice.shippingValue),
        insurance_value: convertToDecimal(order_invoice.InsuranceValue),
        ipi_value: convertToDecimal(order_invoice.ipiValue),
        total_value: convertToDecimal(order_invoice.totalValue),
        transaction_branch_code: order_invoice.transactionBranchCode.toString(),
        transaction_code: order_invoice.transactionCode.toString(),
        transaction_date: order_invoice.transactionDate,
        status: order_invoice.status,
        order_code: created_order.code,
        order_id: created_order.id,
      })
    }
  }
}
