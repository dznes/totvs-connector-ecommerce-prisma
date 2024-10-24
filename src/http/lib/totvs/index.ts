import { env } from '@/env'
import { Color } from './interfaces/colors'
import { SkuDetail } from './interfaces/sku-details'
import { SkuCost } from './interfaces/sku-cost'
import { SkuPrice } from './interfaces/sku-price'
import { SkuAvailableStock } from './interfaces/sku-available-stock'
import { ProductionOrder } from './interfaces/sku-production-order'
import { Order } from './interfaces/orders'
import { CreateUserRequest, User } from './interfaces/user-info'
import { Classification } from './interfaces/classifications'

interface TotvsProps {
  token: string
  page: number
  pageSize?: number
  daysStartFromToday?: number
  daysEndFromToday?: number
}
interface TotvsResponse {
  totalItems: number
  totalPages: number
  hasNext: boolean
}

interface Token {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
}
interface ColorList extends TotvsResponse {
  items: Color[]
}
interface OrdersList extends TotvsResponse {
  items: Order[]
}
// interface OrderItemsList extends TotvsResponse{
//   items: OrdersItems[]
// }
interface ProductionOrderList extends TotvsResponse {
  items: ProductionOrder[]
}
interface ProductInfoList extends TotvsResponse {
  items: SkuDetail[]
}
interface ProductCostList extends TotvsResponse {
  items: SkuCost[]
}
interface ProductPriceList extends TotvsResponse {
  items: SkuPrice[]
}
interface ProductBalanceList extends TotvsResponse {
  items: SkuAvailableStock[]
}
interface RetailClients extends TotvsResponse {
  items: User[]
}
interface ClassificationsList extends TotvsResponse {
  items: Classification[]
}
interface GetClassificationsProps {
  token: string
  typeCodeList?: number[]
}

// TOTVS Base URL
const totvs_url = env.totvs_url
const totvs_test_url = process.env.totvs_test_url

// HELPER FUNCTIONS
/**
 * Formats a Date object to an ISO string with milliseconds.
 * @param date - The Date object to format.
 * @returns The ISO string with milliseconds.
 */
function formatISODateWithMillis(date: Date): string {
  return date.toISOString()
}

/**
 * Builds the authorization header for API requests.
 * @param token - The token to use for authorization.
 * @returns The header object containing authorization and content-type.
 */
// Header builder
function headerBuilder(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

// API ENDPOINTS

/**
 * Fetches an authorization token from the TOTVS API.
 * @returns An object containing access token, token type, expiration time, and refresh token.
 */
export async function fetchToken(): Promise<Token> {
  const url = `${totvs_url}/api/totvsmoda/authorization/v2/token`

  const body = {
    grant_type: 'password',
    client_id: env.client_id,
    client_secret: env.client_secret,
    username: env.username,
    password: env.password,
  }

  const { access_token, token_type, expires_in, refresh_token }: Token =
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body).toString(),
    }).then((response) => response.json())

  return { access_token, token_type, expires_in, refresh_token }
}

export async function fetchTestEnvToken(): Promise<Token> {
  const url = `${totvs_test_url}/api/totvsmoda/authorization/v2/token`

  const body = {
    grant_type: 'password',
    client_id: process.env.test_client_id ?? '',
    client_secret: process.env.test_client_secret ?? '',
    username: process.env.test_username ?? '',
    password: process.env.test_password ?? '',
  }

  const { access_token, token_type, expires_in, refresh_token }: Token =
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body).toString(),
    }).then((response) => response.json())

  return { access_token, token_type, expires_in, refresh_token }
}

/**
 * Lists orders from the TOTVS API within a specific date range.
 * @param props - The parameters for listing orders, including token, page, pageSize, daysStartFromToday, and daysEndFromToday.
 * @returns A promise that resolves to the TOTVS response containing orders.
 */
export async function getOrders({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<OrdersList> {
  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 3
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const url = `${totvs_url}/api/totvsmoda/sales-order/v2/orders/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
      startOrderDate: '2020-01-01T17:34:58.073Z',
      endOrderDate: formatISODateWithMillis(currentDate),
      branchCodeList: [1, 2],
    },
    page,
    pageSize: pageSize ?? 200,
    expand: 'items,shippingAddress,invoices',
  }
  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

/**
 * Retrieves order items from the TOTVS API with expanded details.
 * @param props - The parameters for retrieving order items, including token, page, pageSize, daysStartFromToday, and daysEndFromToday.
 * @returns A promise that resolves to the TOTVS response containing order items.
 */
export async function getOrderItems({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<TotvsResponse> {
  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 3
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const url = `${totvs_url}/api/totvsmoda/sales-order/v2/orders/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
      startOrderDate: '2020-01-01T17:34:58.073Z',
      endOrderDate: '2050-04-04T17:34:58.073Z',
      branchCodeList: [1, 2],
    },
    page,
    pageSize: pageSize ?? 200,
    expand: 'items,shippingAddress',
  }
  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

/**
 * Retrieves production orders (OPs) from the TOTVS API within a specific date range.
 * @param props - The parameters for retrieving production orders, including token, page, pageSize, daysStartFromToday, and daysEndFromToday.
 * @returns A promise that resolves to the TOTVS response containing production orders.
 */
export async function getProductionOrders({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<ProductionOrderList> {
  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 3
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const url = `${totvs_url}/api/totvsmoda/production-order/v2/orders/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      branchCodeList: [1, 2],
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    },
    page,
    pageSize: pageSize ?? 200,
    expand: 'locations,items',
  }
  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

/**
 * Retrieves product information from the TOTVS API.
 * @param props - The parameters for retrieving product information, including token, page, pageSize, daysStartFromToday, and daysEndFromToday.
 * @returns A promise that resolves to the TOTVS response containing product information.
 */
export async function getProductInfos({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<ProductInfoList> {
  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 3
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const url = `${totvs_url}/api/totvsmoda/product/v2/products/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        inProduct: true,
        inBranchInfo: true,
        branchInfoCodeList: [1, 2],
        inCost: true,
        branchCostCodeList: [1, 2],
        costCodeList: [2],
        inPrice: true,
        inDigitalPromotionPrice: true,
        branchPriceCodeList: [1, 2],
        priceCodeList: [1, 2],
      },
    },
    option: {
      branchInfoCode: 1,
    },
    page,
    pageSize: pageSize ?? 100,
    order: 'productCode',
  }
  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

/**
 * Retrieves product costs from the TOTVS API.
 * @param props - The parameters for retrieving product costs, including token, page, pageSize, daysStartFromToday, and daysEndFromToday.
 * @returns A promise that resolves to the TOTVS response containing product costs.
 */
export async function getProductCosts({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<ProductCostList> {
  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 3
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const url = `${totvs_url}/api/totvsmoda/product/v2/costs/search`

  const headers = headerBuilder(token)

  // Last purchase cost code is 2
  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        inCost: true,
        inProduct: true,
        branchCostCodeList: [1, 2],
        costCodeList: [2],
      },
    },
    option: {
      costs: [
        {
          branchCode: 1,
          costCodeList: [2],
        },
      ],
    },
    page,
    pageSize: pageSize ?? 200,
    order: 'productCode',
  }
  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

/**
 * Retrieves product prices from the TOTVS API.
 * @param props - The parameters for retrieving product prices, including token, page, pageSize, daysStartFromToday, and daysEndFromToday.
 * @returns A promise that resolves to the TOTVS response containing product prices.
 */
export async function getProductPrices({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<ProductPriceList> {
  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 3
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const url = `${totvs_url}/api/totvsmoda/product/v2/prices/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        inPrice: true,
        branchPriceCodeList: [1, 2],
        priceCodeList: [1, 2],
        inProduct: true,
      },
    },
    option: {
      branchCodeList: [1, 2],
      prices: [
        {
          branchCode: 1,
          priceCodeList: [1, 2, 3, 4],
        },
      ],
    },
    page,
    pageSize: pageSize ?? 200,
    order: 'productCode',
  }
  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

/**
 * Retrieves product balances from the TOTVS API.
 * @param props - The parameters for retrieving product balances, including token, page, pageSize, daysStartFromToday, and daysEndFromToday.
 * @returns A promise that resolves to the TOTVS response containing product balances.
 */
export async function getProductBalances({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<ProductBalanceList> {
  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 3
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const url = `${totvs_url}/api/totvsmoda/product/v2/balances/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        inStock: true,
        branchStockCodeList: [1, 2],
        stockCodeList: [3],
      },
    },
    option: {
      balances: [
        {
          branchCode: 1,
          // Stock code 3 is for the "FIS+INSPECAO" <-- Using this one for now
          // Stock code 4 "DEVOLUCAO"
          // Stock code 5 "EM TERCEIROS"
          // Stock code 6 "DE TERCEIROS"
          // Stock code 7 "DEFEITO"
          // Stock code 8 "CONFERENCIA"
          // Stock Code 10 "SHOWROOM"
          // Stock code 11 "ESTILO"
          // Stock code 12 "PRE VENDA"
          stockCodeList: [3],
          isTransaction: true,
          isSalesOrder: true,
          isProductionOrder: true,
        },
      ],
    },
    page,
    pageSize: pageSize ?? 200,
    order: 'productCode',
  }
  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

/**
 * Retrieves colors from the TOTVS API.
 * @param props - The parameters for retrieving colors, including token, page, pageSize, daysStartFromToday, and daysEndFromToday.
 * @returns A promise that resolves to the TOTVS response containing colors.
 */
export async function getColors({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<ColorList> {
  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 1000
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const url = `${totvs_url}/api/totvsmoda/product/v2/colors/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    },
    page,
    pageSize: pageSize ?? 200,
  }

  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

export async function getRetailClients({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<RetailClients> {
  const url = `${totvs_url}/api/totvsmoda/person/v2/individuals/search`

  const headers = headerBuilder(token)

  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 1000
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        inCustomer: true,
      },
    },
    option: {},
    page,
    pageSize: pageSize ?? 200,
    expand: 'emails,phones,addresses,rg',
  }

  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

export async function getWholesaleClients({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<RetailClients> {
  const url = `${totvs_url}/api/totvsmoda/person/v2/legal-entities/search`

  const headers = headerBuilder(token)

  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 1000
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        inCustomer: true,
      },
    },
    option: {},
    page,
    pageSize: pageSize ?? 200,
    expand: 'emails,phones,addresses,rg',
  }

  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

export async function getClassifications({
  token,
  typeCodeList,
}: GetClassificationsProps): Promise<ClassificationsList> {
  const typeCodeParams = typeCodeList?.length
    ? typeCodeList.map((typeCode) => `TypeCodeList=${typeCode}`).join('&')
    : ''

  const url = `${totvs_url}/api/totvsmoda/product/v2/classifications${typeCodeParams ? `?${typeCodeParams}` : ''}`

  const headers = headerBuilder(token)

  const data = await fetch(url, {
    method: 'GET',
    headers,
  }).then((response) => response.json())

  return data
}

interface GetProductCodesByClassificationProps extends TotvsProps {
  classificationTypeCode: number
  classificationCode: string
}
interface GetProductCodesByClassificationResponse extends TotvsResponse {
  items: {
    productCode: number
    maxChangeFilterDate: Date
  }[]
}
export async function getProductCodesByClassification({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
  classificationTypeCode,
  classificationCode,
}: GetProductCodesByClassificationProps): Promise<GetProductCodesByClassificationResponse> {
  const currentDate = new Date()
  const daysStart = daysStartFromToday ?? 1080
  const daysEnd = daysEndFromToday ?? 0

  const startDate = new Date(currentDate.getTime())
  startDate.setDate(currentDate.getDate() - daysStart)

  const endDate = new Date(currentDate.getTime())
  endDate.setDate(currentDate.getDate() - daysEnd)

  const formattedStartDate = formatISODateWithMillis(startDate)
  const formattedEndDate = formatISODateWithMillis(endDate)

  const url = `${totvs_url}/api/totvsmoda/product/v2/product-codes/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        inProduct: true,
        inBranchInfo: true,
        branchInfoCodeList: [1, 2],
      },
      classifications: [
        {
          type: classificationTypeCode,
          codeList: [classificationCode],
        },
      ],
    },
    option: {
      branchInfoCode: 1,
    },
    page,
    pageSize: pageSize ?? 100000,
    order: 'productCode',
  }

  const data = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return data
}

// CREATION ROUTE FUNCTIONS
export async function createRetailClient({
  token,
  name,
  cpf,
  rg,
  birthDate,
  gender,
  email,
}: CreateUserRequest): Promise<RetailClients> {
  const url = `${totvs_test_url}/api/totvsmoda/person/v2/individual-customers`

  const headers = headerBuilder(token)

  const body = {
    branchInsertCode: 1,
    insertDate: new Date(),
    name,
    cpf,
    rg,
    birthDate,
    gender,
    isInactive: false,
    registrationStatus: 'Normal',
    isBloqued: false,
    isCustomer: true,
    isSupplier: false,
    isRepresentative: false,
    isPurchasingGuide: false,
    isShippingCompany: false,
    isEmployee: false,
    employeeStatus: 'Ativo',
    customerStatus: 'Ativo',
    emails: [
      {
        sequence: 1,
        typeCode: 1,
        typeName: 'COMERCIAL',
        email,
        isDefault: true,
      },
    ],
  }

  const { customerCode } = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return customerCode
}

export async function createWholesaleClient({
  token,
  name,
  cnpj,
  birthDate,
  gender,
  email,
}: CreateUserRequest): Promise<RetailClients> {
  const url = `${totvs_test_url}/api/totvsmoda/person/v2/legal-customers`

  const headers = headerBuilder(token)

  const body = {
    branchInsertCode: 1,
    insertDate: new Date(),
    name,
    cnpj,
    birthDate,
    gender,
    isInactive: false,
    registrationStatus: 'Normal',
    isBloqued: false,
    isCustomer: true,
    isSupplier: false,
    isRepresentative: false,
    isPurchasingGuide: false,
    isShippingCompany: false,
    isEmployee: false,
    employeeStatus: 'Ativo',
    customerStatus: 'Ativo',
    emails: [
      {
        sequence: 1,
        typeCode: 1,
        typeName: 'COMERCIAL',
        email,
        isDefault: true,
      },
    ],
  }

  const { customerCode } = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return customerCode
}

interface createRetailClientAddressProps {
  token: string
  cpf: string
  type: string
  zip_code: string
  street: string
  number: number
  complement?: string
}

export async function createRetailClientAddress({
  token,
  cpf,
  type,
  zip_code,
  street,
  number,
  complement,
}: createRetailClientAddressProps): Promise<RetailClients> {
  const url = `${totvs_test_url}/api/totvsmoda/person/v2/individual-customers`

  const headers = headerBuilder(token)

  const body = {
    branchInsertCode: 1,
    cpf,
    addresses: [
      {
        addressTypeCode: 5,
        addressType: type,
        address: street,
        cep: zip_code,
        number,
        complement,
      },
    ],
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  return response
}

interface createRetailClientPhoneProps {
  token: string
  type: string
  cpf: string
  ddd: string
  number: string
}

export async function createRetailClientPhone({
  token,
  cpf,
  type,
  ddd,
  number,
}: createRetailClientPhoneProps): Promise<RetailClients> {
  const url = `${totvs_test_url}/api/totvsmoda/person/v2/individual-customers`

  const headers = headerBuilder(token)
  const typeCode = type === 'COMERCIAL' ? 1 : 2

  const body = {
    branchInsertCode: 1,
    cpf,
    phones: [
      {
        typeCode,
        number: `${ddd}${number}`,
      },
    ],
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((response) => response.json())

  console.log(response)

  return response
}

interface OrderItem {
  productCode: number
  price: number
  quantity: number
  billingForecastDate: string
}

interface OrderCreation {
  id: string
  created_at: string
  operationCode: number
  freight_value: number
  total_value: number
  items: OrderItem[]
}

interface Client {
  code: string
  cpf: string
}

interface Payment {
  document_type: string
  transaction_id: string
  nsu?: string
  authorization_code?: string
  credit_card_operator?: string
  card_brand?: string
  installments: number
  total_value: number
  created_at: string
}

// interface ShippingAddress {
//   cep: string
//   address: string
//   number: number
//   complement?: string
// }

interface Shipping {
  zip_code: string
  street: string
  number: number
  complement?: string
  service_code: string
  service_name: string
}

interface CreateOrderRequest {
  token: string
  order: OrderCreation
  client: Client
  payment: Payment
  shipping: Shipping
}

export async function createOrder({
  token,
  order,
  client,
  payment,
  shipping,
}: CreateOrderRequest): Promise<any> {
  const url = `${totvs_test_url}/api/totvsmoda/sales-order/v2/b2c-orders`

  const headers = headerBuilder(token)
  const body = {
    orderId: order.id,
    branchCode: 1,
    customerOrderCode: order.id,
    integrationCode: order.id,
    orderDate: order.created_at,
    customerCode: client.code,
    representativeCode: 100000008,
    sellerCode: 50,
    operationCode: order.operationCode,
    paymentConditionCode: 1,
    paymentBaseDate: payment.created_at,
    priorityCode: 99,
    arrivalDate: '2024-09-04T13:36:45.040Z',
    shippingCompanyCode: 64,
    billingForecastDate: payment.created_at,
    freightType: 1,
    freightValue: order.freight_value,
    statusOrder: 'Blocked',
    shippingService: shipping.service_code,
    shippingServiceName: shipping.service_name,
    experienceType: 'Ecommerce',
    totalAmountOrder: order.total_value,
    items: order.items,
    classifications: [
      {
        classificationTypeCode: 1,
        classificationCode: '02',
      },
    ],
    payments: [
      {
        documentType: payment.document_type,
        nsu: payment.nsu,
        authorizationCode: payment.authorization_code,
        creditCardOperator: payment.credit_card_operator,
        creditCardBrand: payment.card_brand,
        assignorCode: 1,
        installment: payment.installments,
        paymentValue: order.total_value,
        currentAccountCode: 1,
        paymentType: 'Normal',
        paymentBranch: 1,
      },
    ],
    observations: [
      {
        observation: 'SEM BRINDE',
      },
    ],
    shippingAddress: {
      cep: shipping.zip_code,
      address: shipping.street,
      number: shipping.number,
      complement: shipping.complement,
    },
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      // Handle non-2xx HTTP status codes
      const errorResponse = await response.json()
      console.log('Error response:', errorResponse)
      throw new Error(
        `API request failed with status ${response.status}: ${JSON.stringify(errorResponse) || 'Unknown error'}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    // Check if error is an instance of Error to safely access its properties
    if (error instanceof Error) {
      console.error('Error creating order:', error.message)
      throw new Error(`Failed to create order: ${error.message}`)
    } else {
      console.error('An unknown error occurred:', error)
      throw new Error('Failed to create order: An unknown error occurred')
    }
  }
}
