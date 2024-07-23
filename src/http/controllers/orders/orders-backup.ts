import { fetchToken, getOrders, getRetailClients } from '@/http/lib/totvs'
import { makeUpsertOrdersUseCase } from '@/use-cases/factories/orders/make-upsert-orders-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * skuPricesBackup function to fetch and upsert SKU prices.
 * @param _: FastifyRequest - The incoming request object (not used).
 * @param reply: FastifyReply - The response object to send the response.
 */
export async function OrdersBackup(
  _: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Fetch the authentication token
    const token = await fetchToken()
    const pageSize = 300
    let page = 1
    let isLastPage = false

    // Create an instance of the update SKU prices use case
    const upsertOrdersUseCase = makeUpsertOrdersUseCase()

    // Loop until the last page is reached
    while (!isLastPage) {
      // Fetch the product prices from the API with the specified parameters
      const { items, hasNext } = await getOrders({
        token: token.access_token,
        page,
        pageSize,
      })

      // Upsert each SKU price into the database
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
            arrival_date: new Date(item.arrivalDate ?? ''),
            shipping_service_name: item.shippingServiceName ?? '',
            shipping_company_code: item.shippingCompanyCode?.toString() ?? '',
            shipping_company_cnpj: item.shippingCompanyCpfCnpj ?? '',
            shipping_company_name: item.shippingCompanyName ?? '',
            shipping_service_code: item.shippingCompanyCode?.toString() ?? '',
            shipping_address: item.shippingAddress,
            order_invoice: item.invoices[0],
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
    return reply
      .status(500)
      .send({ error: 'Failed to fetch orders details' })
  }
}
