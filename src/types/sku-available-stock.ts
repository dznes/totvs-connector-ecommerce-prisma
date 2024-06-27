interface Balances {
  stock: number
}

export interface SkuAvailableStock {
  productCode: number
  balances: Balances[]
}
