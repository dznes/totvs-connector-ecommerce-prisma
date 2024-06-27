import { env } from '@/env'

interface TotvsProps {
  token: string
  page: number
  pageSize?: number
  daysStartFromToday?: number
  daysEndFromToday?: number
}
interface TotvsResponse {
  items: any[]
  totalItems: number
  totalPages: number
  hasNext: boolean
}

// TOTVS Base URL
const totvs_url = env.totvs_url

// HELPER FUNCTIONS
// ISO date with miliseconds to string
function formatISODateWithMillis(date: Date): String {
  return date.toISOString()
}

function headerBuilder(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

// API ENDPOINTS
export async function fetchToken() {
  const url = `${totvs_url}/api/totvsmoda/authorization/v2/token`

  const body = {
    grant_type: 'password',
    client_id: env.client_id,
    client_secret: env.client_secret,
    username: env.username,
    password: env.password,
  }

  const { access_token, token_type, expires_in, refresh_token } = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body).toString(),
    },
  ).then((response) => response.json())

  return { access_token, token_type, expires_in, refresh_token }
}

export async function listOrders({
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
      endOrderDate: formatISODateWithMillis(currentDate),
      branchCodeList: [1, 2],
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

export async function getOps({
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

export async function getProductInfos({
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

export async function getProductCosts({
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

  const url = `${totvs_url}/api/totvsmoda/product/v2/costs/search`

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
        costCodeList: [1, 2, 3, 4],
      },
    },
    option: {
      costs: [
        {
          branchCode: 1,
          costCodeList: [1, 2, 3, 4],
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

export async function getProductPrices({
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

  const url = `${totvs_url}/api/totvsmoda/product/v2/prices/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        inProduct: true,
      },
    },
    option: {
      branchCodeList: [1],
      prices: [
        {
          branchCode: 1,
          priceCodeList: [1, 2],
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

export async function getProductBalances({
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

  const url = `${totvs_url}/api/totvsmoda/product/v2/balances/search`

  const headers = headerBuilder(token)

  const body = {
    filter: {
      change: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        inProduct: true,
        inStock: true,
        branchStockCodeList: [1, 2],
        stockCodeList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        inSalesOrder: true,
        branchSalesOrderCodeList: [1, 2],
        inPurchaseOrder: true,
        branchPurchaseOrderCodeList: [1, 2],
        inTransaction: true,
        branchTransactionCodeList: [1, 2],
      },
    },
    option: {
      balances: [
        {
          branchCode: 1,
          stockCodeList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
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

export async function getColors({
  token,
  page,
  pageSize,
  daysStartFromToday,
  daysEndFromToday,
}: TotvsProps): Promise<TotvsResponse> {
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
