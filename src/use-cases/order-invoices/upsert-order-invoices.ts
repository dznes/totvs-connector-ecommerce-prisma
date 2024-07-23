import { OrdersRepository } from '@/repositories/orders-repository';
import { OrderInvoice } from '@/http/lib/totvs/interfaces/orders';
import { OrderInvoicesRepository } from '@/repositories/order-invoices-repository';
import { convertToDecimal } from '@/core/entities/value-objects/convert-to-decimal';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface UpsertOrderInvoicesUseCaseRequest {
  order_code: string;
  order_invoice: OrderInvoice;
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
    const order = await this.ordersRepository.findByCode(order_code);

    if (!order) {
      throw new Error(`Order with code ${order_code} not found`);
    }

    const old_order_invoice = await this.orderInvoicesRepository.findByCode(
      order_invoice.code.toString(),
    );

    if (old_order_invoice) {
      await this.orderInvoicesRepository.update({
        ...old_order_invoice,
        access_key: order_invoice.accessKey ?? old_order_invoice.access_key,
        serial: order_invoice.serial ?? old_order_invoice.serial,
        tracking_code: order_invoice.trackingCode ?? old_order_invoice.tracking_code,
        shipping_company_name: order_invoice.shippingCompanyName ?? old_order_invoice.shipping_company_name,
        issue_date: order_invoice.issueDate ?? old_order_invoice.issue_date,
        net_weight: order_invoice.netWeight ?? old_order_invoice.net_weight,
        gross_weight: order_invoice.grossWeight ?? old_order_invoice.gross_weight,
        package_number: order_invoice.packageNumber ?? old_order_invoice.package_number,
        quantity: order_invoice.quantity ?? old_order_invoice.quantity,
        discount_percentage: order_invoice.discountPercentage ?? old_order_invoice.discount_percentage,
        additional_value: convertToDecimal(order_invoice.additionalValue ?? old_order_invoice.additional_value),
        product_value: convertToDecimal(order_invoice.productValue ?? old_order_invoice.product_value),
        shipping_value: convertToDecimal(order_invoice.shippingValue ?? old_order_invoice.shipping_value),
        insurance_value: convertToDecimal(order_invoice.InsuranceValue ?? old_order_invoice.insurance_value),
        ipi_value: convertToDecimal(order_invoice.ipiValue ?? old_order_invoice.ipi_value),
        total_value: convertToDecimal(order_invoice.totalValue ?? old_order_invoice.total_value),
        transaction_branch_code: order_invoice.transactionBranchCode.toString(),
        transaction_code: order_invoice.transactionCode.toString(),
        transaction_date: order_invoice.transactionDate ?? old_order_invoice.transaction_date,
        status: order_invoice.status ?? old_order_invoice.status,
        updated_at: new Date(),
      });

      console.log(`Order Invoice ${old_order_invoice.code} updated.`);
    } else {
      try {
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
        });

        console.log(`Order Invoice ${order_invoice.code} created.`);
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
          console.error(`Order Invoice with code ${order_invoice.code} already exists.`);
          // Optionally, you can rethrow the error or handle it accordingly.
        } else {
          throw error;
        }
      }
    }
  }
}