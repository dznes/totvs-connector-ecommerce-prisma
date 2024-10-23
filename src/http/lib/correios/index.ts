// VTEX Base URL and API variables
const correios_cep_url = 'https://api.correios.com.br'

/**
 * Builds the authorization header for API requests.
 * @returns The header object containing authorization and content-type.
 */
// Header builder
function headerBuilder(token: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

function authenticateHeaderBuilder() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${process.env.CORREIOS_USERNAME}:${process.env.CORREIOS_API_KEY}`).toString('base64')}`,
  }
}

// API ENDPOINTS
interface GetTokenWithPostageCardResponse {
  ambiente: string
  id: string
  ip: string
  perfil: string
  cnpj: string
  emissao: string
  expiraEm: string
  zoneOffset: string
  cartaoPostagem: {
    numero: string
    contrato: string
    dr: number
    api: Array<number>
  }
  token: string
  categoria?: string
}

export async function getTokenWithPostageCard(): Promise<GetTokenWithPostageCardResponse> {
  const url = `${correios_cep_url}/token/v1/autentica/cartaopostagem`
  const body = {
    numero: process.env.CORREIOS_POSTAGE_CARD,
    contrato: process.env.CORREIOS_CONTRACT,
    dr: process.env.CORREIOS_DR,
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: authenticateHeaderBuilder(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Failed to authenticate: ${response.statusText}`)
    }

    const {
      ambiente,
      id,
      ip,
      perfil,
      cnpj,
      categoria,
      emissao,
      expiraEm,
      zoneOffset,
      cartaoPostagem,
      token,
    } = await response.json()

    return {
      ambiente,
      id,
      ip,
      perfil,
      cnpj,
      categoria,
      emissao,
      expiraEm,
      zoneOffset,
      cartaoPostagem,
      token,
    }
  } catch (error) {
    console.error('Error fetching Token info:', error)
    throw new Error('Failed to fetch Token information')
  }
}

interface AddressInfoByCEPResponde {
  cep: string
  uf: string
  numeroLocalidade: number
  localidade: string
  logradouro: string
  tipoLogradouro: string
  nomeLogradouro: string
  numeroLogradouro?: number
  complemento: string
  abreviatura: string
  bairro: string
  cepUnidadeOperacional: string
  numeroLocalidadeSuperior?: string
  localidadeSuperior?: string
  nome?: string
  siglaUnidade?: string
  tipoCEP: number
  cepAnterior?: string
  distrito?: string
  lado?: string
  numeroInicial?: number
  numeroFinal?: number
  clique?: string
  caixasPostais?: {
    nuInicial: number
    nuFinal: number
  }[]
  locker?: string
  agenciaModular?: string
  txMsg?: string
}

export async function AddressInfoByCEP(
  cep: string,
): Promise<AddressInfoByCEPResponde> {
  const url = `${correios_cep_url}/cep/v2/enderecos//${cep}`
  const { token } = await getTokenWithPostageCard()

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headerBuilder(token),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch CEP Info: ${response.statusText}`)
    }

    const {
      cep,
      uf,
      numeroLocalidade,
      localidade,
      logradouro,
      tipoLogradouro,
      nomeLogradouro,
      numeroLogradouro,
      complemento,
      abreviatura,
      bairro,
      numeroLocalidadeSuperior,
      localidadeSuperior,
      nome,
      siglaUnidade,
      tipoCEP,
      cepAnterior,
      distrito,
      cepUnidadeOperacional,
      lado,
      numeroInicial,
      numeroFinal,
      clique,
      caixasPostais,
      locker,
      agenciaModular,
      txMsg,
    } = await response.json()

    return {
      cep,
      uf,
      numeroLocalidade,
      localidade,
      logradouro,
      tipoLogradouro,
      nomeLogradouro,
      numeroLogradouro,
      complemento,
      abreviatura,
      bairro,
      numeroLocalidadeSuperior,
      localidadeSuperior,
      nome,
      siglaUnidade,
      tipoCEP,
      cepAnterior,
      distrito,
      cepUnidadeOperacional,
      lado,
      numeroInicial,
      numeroFinal,
      clique,
      caixasPostais,
      locker,
      agenciaModular,
      txMsg,
    }
  } catch (error) {
    console.error('Error fetching CEP info:', error)
    throw new Error('Failed to fetch CEP information')
  }
}

interface CalculatePriceRequest {
  codigoServico: string
  cepDestino: string
  cepOrigem: string
  pesoObjeto: string
  tipoObjeto?: string
  comprimento?: string
  largura?: string
  altura?: string
  diametro?: string
}
interface CalculatePriceResponse {
  coProduto: string
  pcBase: string
  pcBaseGeral: string
  peVariacao: string
  pcReferencia: string
  vlBaseCalculoImposto: string
  inPesoCubico: string
  psCobrado: string
  peAdValorem: string
  vlSeguroAutomatico: string
  qtAdicional: string
  pcFaixa: string
  pcFaixaVariacao: string
  pcProduto: string
  pcFinal: string
}

export async function calculatePrice({
  codigoServico,
  cepDestino,
  cepOrigem,
  pesoObjeto,
  tipoObjeto,
  comprimento,
  largura,
  altura,
  diametro,
}: CalculatePriceRequest): Promise<CalculatePriceResponse> {
  const url = `${correios_cep_url}/preco/v1/nacional/${codigoServico}?cepDestino=${cepDestino}&cepOrigem=${cepOrigem}&psObjeto=${pesoObjeto}&tipoObjeto=${tipoObjeto}&comprimento=${comprimento}&largura=${largura}&altura=${altura}&diametro=${diametro}`
  const { token } = await getTokenWithPostageCard()

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headerBuilder(token),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch CEP Info: ${response.statusText}`)
    }

    const {
      coProduto,
      pcBase,
      pcBaseGeral,
      peVariacao,
      pcReferencia,
      vlBaseCalculoImposto,
      inPesoCubico,
      psCobrado,
      peAdValorem,
      vlSeguroAutomatico,
      qtAdicional,
      pcFaixa,
      pcFaixaVariacao,
      pcProduto,
      pcFinal,
    } = await response.json()

    return {
      coProduto,
      pcBase,
      pcBaseGeral,
      peVariacao,
      pcReferencia,
      vlBaseCalculoImposto,
      inPesoCubico,
      psCobrado,
      peAdValorem,
      vlSeguroAutomatico,
      qtAdicional,
      pcFaixa,
      pcFaixaVariacao,
      pcProduto,
      pcFinal,
    }
  } catch (error) {
    console.error('Error fetching CEP info:', error)
    throw new Error('Failed to fetch CEP information')
  }
}

interface CalculateDeliveryDateRequest {
  codigoServico: string
  cepDestino: string
  cepOrigem: string
  dataEvento?: string
}
interface CalculateDeliveryDateResponse {
  coProduto: string
  prazoEntrega: number
  dataMaxima: string
  entregaDomiciliar: string
  entregaSabado: string
  entregaDomingo: string
}

export async function calculateDeliveryDate({
  codigoServico,
  cepDestino,
  cepOrigem,
  dataEvento,
}: CalculateDeliveryDateRequest): Promise<CalculateDeliveryDateResponse> {
  const url = `${correios_cep_url}/prazo/v1/nacional/${codigoServico}?cepDestino=${cepDestino}&cepOrigem=${cepOrigem}&dataEvento=${dataEvento}`
  const { token } = await getTokenWithPostageCard()

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headerBuilder(token),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch CEP Info: ${response.statusText}`)
    }

    const {
      coProduto,
      prazoEntrega,
      dataMaxima,
      entregaDomiciliar,
      entregaSabado,
      entregaDomingo,
    } = await response.json()

    return {
      coProduto,
      prazoEntrega,
      dataMaxima,
      entregaDomiciliar,
      entregaSabado,
      entregaDomingo,
    }
  } catch (error) {
    console.error('Error fetching CEP info:', error)
    throw new Error('Failed to fetch CEP information')
  }
}
