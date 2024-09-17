// VTEX Base URL and API variables
const correios_cep_url = 'http://viacep.com.br/ws'

/**
 * Builds the authorization header for API requests.
 * @returns The header object containing authorization and content-type.
 */
// Header builder
function headerBuilder() {
  return {
    'Content-Type': 'application/json',
  }
}

interface AddressInfoByCEPResponde {
  cep: string
  logadouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

// API ENDPOINTS
export async function AddressInfoByCEP(cep: string): Promise<AddressInfoByCEPResponde> {
  const url = `${correios_cep_url}/${cep}/json`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headerBuilder(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch CEP Info: ${response.statusText}`)
    }

    const { cep, logadouro, complemento, unidade, bairro, localidade, uf, estado, regiao, ibge, gia, ddd, siafi } = await response.json()

    return { cep, logadouro, complemento, unidade, bairro, localidade, uf, estado, regiao, ibge, gia, ddd, siafi }
  } catch (error) {
    console.error('Error fetching CEP info:', error)
    throw new Error('Failed to fetch CEP information')
  }
}
