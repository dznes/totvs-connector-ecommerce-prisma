import { env } from '@/env'

// VTEX Base URL and API variables
const vtex_url = 'https://zenoficial.vtexcommercestable.com.br/api'
const VTEX_API_AppKey = env.VTEX_API_AppKey
const VTEX_API_AppToken = env.VTEX_API_AppToken

/**
 * Builds the authorization header for API requests.
 * @returns The header object containing authorization and content-type.
 */
// Header builder
function headerBuilder() {
  return {
    'X-VTEX-API-AppKey': VTEX_API_AppKey,
    'X-VTEX-API-AppToken': VTEX_API_AppToken,
    'Content-Type': 'application/json',
  }
}

// API ENDPOINTS
export async function productsInfo(from: number, to: number): Promise<any> {
  const url = `${vtex_url}/catalog_system/pub/products/search?_from=${from}&_to=${to}`

  const response = await fetch(url, {
    method: 'GET',
    headers: headerBuilder(),
  })

  const products = await response.json()

  const resourcesHeader = response.headers.get('resources')
  let totalResources = null
  if (resourcesHeader) {
    const parts = resourcesHeader.split('/')
    totalResources = parts.length > 1 ? parts[1] : null
  }

  return { products, totalResources }
}
