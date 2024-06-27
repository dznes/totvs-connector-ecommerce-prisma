interface Cost {
  branchCode: number
  costCode: number
  costName: string
  cost: number
}

export interface SkuCost {
  productCode: number
  costs: Cost[]
}
