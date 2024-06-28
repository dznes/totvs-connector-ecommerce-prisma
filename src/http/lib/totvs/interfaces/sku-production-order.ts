interface SkuProductionOrder {
  productCode: number
  productName: string
  colorCode: string
  sizeCode: number
  sizeName: string
  referenceCode: string
  referenceName: string
  quantity: number
  finishedQuantity: number
  pendingQuantity: number
  isStartMovement: string
}

export interface ProductionOrder {
  branchCode: number
  orderCode: number
  quantity: number
  finishedQuantity: number
  pendingQuantity: number
  status: number
  estimatedDeliveryDate: Date | null
  insertDate: Date
  lastChangeDate: Date
  endDate: Date | null
  startMovimentDate: Date | null
  customerCode: string
  customerCpfCnpj: string
  customerName: string
  priority: number
  locations: []
  items: SkuProductionOrder[]
}
