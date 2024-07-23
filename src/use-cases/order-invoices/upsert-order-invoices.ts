import { OrdersRepository } from '@/repositories/orders-repository'
import { OrderInvoice } from '@/http/lib/totvs/interfaces/orders'
import { OrderInvoicesRepository } from '@/repositories/order-invoices-repository'

import { convertToDecimal } from '@/core/entities/value-objects/convert-to-decimal'

interface UpsertOrderInvoicesUseCaseRequest {
  order_code: string
  order_invoice: OrderInvoice
}

export class UpsertOrderInvoicesUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderInvoicesRepository: OrderInvoicesRepository,
  ) {}

  async execute({
    order_code,
    order_invoice,
  }: UpsertOrderInvoicesUseCaseRequest) {
    const order = await this.ordersRepository.findByCode(order_code)
    const old_order_invoice = await this.orderInvoicesRepository.findByCode(
      order_invoice.code.toString(),
    )

    if (order && old_order_invoice) {
      await this.orderInvoicesRepository.update({
        ...old_order_invoice,
        updated_at: new Date(),
      })

      console.log(`Order Invoice ${old_order_invoice.code} updated.`)
    } else if (order && !old_order_invoice) {
      await this.orderInvoicesRepository.create({
        code: order_invoice.code.toString(),
        access_key: order_invoice.accessKey ?? '',
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
        order: {
          connect: {
            code: order_code,
            id: order.id,
          },
        },
      })

      console.log(`Order Invoice ${order_invoice.code} updated.`)
    }
  }
}
