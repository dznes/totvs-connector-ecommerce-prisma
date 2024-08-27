import { fetchToken, getRetailClients } from '@/http/lib/totvs'
import { makeUpsertUsersUseCase } from '@/use-cases/factories/users/make-upsert-users-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * skuPricesBackup function to fetch and upsert SKU prices.
 * @param _: FastifyRequest - The incoming request object (not used).
 * @param reply: FastifyReply - The response object to send the response.
 */
export async function retailUsersBackup(
  _: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Fetch the authentication token
    const token = await fetchToken()
    const pageSize = 300
    const daysStartFromToday = 3
    const daysEndFromToday = 0
    let page = 1
    let isLastPage = false

    // Create an instance of the update SKU prices use case
    const upsertUsersUseCase = makeUpsertUsersUseCase()

    // Loop until the last page is reached
    while (!isLastPage) {
      // Fetch the product prices from the API with the specified parameters
      const { items, hasNext } = await getRetailClients({
        token: token.access_token,
        page,
        pageSize,
        daysStartFromToday,
        daysEndFromToday,
      })

      // Upsert each SKU price into the database
      items.map(async (item) => {
        await upsertUsersUseCase.execute({
          code: item.code.toString(),
          status: 200,
          name: item.name,
          email:
            item.emails[0]?.email ??
            item.emails[1]?.email ??
            item.emails[2]?.email ??
            '',
          phone: item.phones[0],
          regitered_at: new Date(item.insertDate),
          rg: item.rg,
          birthDate: item.birthDate ?? null,
          address: item.addresses[0],
          cpf: item.cpf ?? '',
          cnpj: '',
          gender: item.gender,
          is_customer: item.isCustumer,
          is_supplier: item.isSupplier,
          is_representative: item.isRepresentative,
          is_shipping_company: item.isShippingCompany,
          is_employee: item.isEmployee,
          is_active: !item.isInactive,
          employee_status: item.employeeStatus,
          totvs_branch_code: item.branchInsertCode,
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
      .send({ error: 'Failed to fetch retail users details' })
  }
}
