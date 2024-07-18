import { fetchToken, getRetailClients } from '@/http/lib/totvs'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * skuPricesBackup function to fetch and upsert SKU prices.
 * @param _: FastifyRequest - The incoming request object (not used).
 * @param reply: FastifyReply - The response object to send the response.
 */
export async function listTotvsUsers(_: FastifyRequest, reply: FastifyReply) {
  try {
    // Fetch the authentication token
    const token = await fetchToken()
    const pageSize = 300
    const page = 28

    const { items } = await getRetailClients({
      token: token.access_token,
      page,
      pageSize,
    })

    const result = items.map((item) => {
      return {
        code: item.code,
        status: 200,
        name: item.name,
        email:
          item.emails[0]?.email ??
          item.emails[1]?.email ??
          item.emails[2]?.email ??
          '',
        phone: item.phones[0],
        regitered_at: item.insertDate,
        rg: item.rg,
        birthDate: item.birthDate,
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
      }
    })

    // Return the number of pages processed in the API response
    return reply.status(200).send(JSON.stringify(result))
  } catch (err) {
    console.error(err)
    // Return an HTTP error response in case of failure
    return reply
      .status(500)
      .send({ error: 'Failed to fetch retail users details' })
  }
}
