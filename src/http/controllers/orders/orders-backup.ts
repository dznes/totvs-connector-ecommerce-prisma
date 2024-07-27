import { fetchToken, getOrders } from '@/http/lib/totvs'
import { makeUpsertOrderInvoicesUseCase } from '@/use-cases/factories/order-invoices/make-upsert-order-invoices-use-case'
import { makeUpsertOrderItemsUseCase } from '@/use-cases/factories/order-items/make-upsert-order-items-use-case'
import { makeUpsertOrdersUseCase } from '@/use-cases/factories/orders/make-upsert-orders-use-case'
import { makeUpsertShippingAddressesUseCase } from '@/use-cases/factories/shipping-addresses/make-upsert-shipping-addresses-use-case'
import { UpsertOrderItemsUseCase } from '@/use-cases/order-items/upsert-order-items'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * skuPricesBackup function to fetch and upsert SKU prices.
 * @param _: FastifyRequest - The incoming request object (not used).
 * @param reply: FastifyReply - The response object to send the response.
 */
export async function OrdersBackup(_: FastifyRequest, reply: FastifyReply) {
  try {
    // Fetch the authentication token
    const token = await fetchToken()
    const pageSize = 300
    const daysStartFromToday = 10
    const daysEndFromToday = 0
    let page = 1
    let isLastPage = false

    // Create an instance of the update SKU prices use case
    const upsertOrdersUseCase = makeUpsertOrdersUseCase()
    const upsertShippingAddressesUseCase = makeUpsertShippingAddressesUseCase()
    const upsertOrderInvoicesUseCase = makeUpsertOrderInvoicesUseCase()
    const upsertOrderItemsUseCase = makeUpsertOrderItemsUseCase()

    // Loop until the last page is reached
    while (!isLastPage) {
      // Fetch the product prices from the API with the specified parameters
      const { items, hasNext } = await getOrders({
        token: token.access_token,
        page,
        pageSize,
        daysStartFromToday,
        daysEndFromToday,
      })

      // Upsert each Order with Shipping Address, Invoices and Order Items into the database
      items.map(async (item) => {
        await upsertOrdersUseCase.execute({
          code: item.orderCode.toString(),
          order_vtex_id: item.orderId,
          operation_code: item.operationCode.toString(),
          operation_name: item.operationName,
          user_code: item.customerCode.toString(),
          payment_condition_name: item.paymentConditionName,
          payment_condition_code: item.paymentConditionCode.toString(),
          representative_code: item.representativeCode?.toString() ?? '',
          representative_name: item.representativeName ?? '',
          items_quantity: item.quantity,
          total_items: item.grossValue,
          discount_value: item.discountValue,
          total_value: item.netValue,
          freight_type: item.freightType,
          freight_value: item.freightValue,
          totvs_branch_code: item.branchCode,
          totvs_order_status: item.statusOrder,
          totvs_creation_date: new Date(item.insertDate),
          arrival_date: item.arrivalDate ?? '',
          shipping_service_name: item.shippingServiceName ?? '',
          shipping_company_code: item.shippingCompanyCode?.toString() ?? '',
          shipping_company_cnpj: item.shippingCompanyCpfCnpj ?? '',
          shipping_company_name: item.shippingCompanyName ?? '',
          shipping_service_code: item.shippingCompanyCode?.toString() ?? '',
          fiscal_code: '',
          status: 200,
          type: 1,
          gateway_id: 'TOTVS',
          utm_campaign: '',
          utm_content: '',
          utm_medium: '',
          utm_source: '',
          utm_term: '',
        })

        if (item.shippingAddress) {
          await upsertShippingAddressesUseCase.execute({
            order_code: item.orderCode.toString(),
            shipping_address: item.shippingAddress,
          })
        }

        if (item.invoices[0] && item.invoices[0].code) {
          await upsertOrderInvoicesUseCase.execute({
            order_code: item.orderCode.toString(),
            order_invoice: item.invoices[0],
          })
        }

        if (item.items) {
          item.items.map(async (orderItem) => {
            await upsertOrderItemsUseCase.execute({
              order_code: item.orderCode.toString(),
              product_code: orderItem.productCode.toString(),
              product_name: orderItem.name,
              product_reference_code: orderItem.referenceCode?.toString() ?? '',
              product_reference_name: orderItem.referenceName ?? '',
              product_sku_code: orderItem.productSku ?? '',
              color_code: orderItem.colorCode,
              color_name: orderItem.colorName,
              size_name: orderItem.sizeName,
              to_settle_quantity: orderItem.toSettleQuantity ?? 0,
              settled_quantity: orderItem.settledQuantity ?? 0,
              canceled_quantity: orderItem.canceledQuantity ?? 0,
              extra_quantity: orderItem.extraQuantity ?? 0,
              pending_quantity: orderItem.pendingQuantity ?? 0,
              original_price: orderItem.originalPrice ?? 0,
              price: orderItem.price ?? 0,
              discount_percentage: orderItem.discountPercentage ?? 0,
              totvs_created_at: new Date(orderItem.insertDate),
              totvs_updated_at: new Date(orderItem.lastChangeDate ?? ''),
            })
          })
        }

      })

      // Check if there are more pages to fetch
      if (!hasNext) {
        isLastPage = true
      } else {
        page++
      }
    }

    // Return the number of pages processed in the API response
    return reply.status(200).send(JSON.stringify({ pages: page }))
  } catch (err) {
    console.error(err)
    // Return an HTTP error response in case of failure
    return reply.status(500).send({ error: 'Failed to fetch orders details' })
  }
}
