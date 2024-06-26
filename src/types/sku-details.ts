interface SkuDetail {
    productCode: number
    productSku: string | null
    productName: string
    maxChangeFilterDate: string
    colorCode: string
    colorName: string
    size: string
    ncm: string
    cst: string
    cest: string | null
    prefixEanGtin: string | null
    isActive: boolean
    isFinishedProduct: boolean
    isRawMaterial: boolean
    isBulkMaterial: boolean
    isOwnProduction: boolean
    measuredUnit: string
    minimumStockAmount: number | null
    maximumStockAmount: number | null
    idealStockAmount: number | null
    SalesStartDate: string | null
    SalesEndDate: string | null
    ReferenceCode: string
    referenceId: number
    referenceName: string
    lastReferenceCode: string
    gridCode: number
    description: string | null
    descriptive: string | null
    isBlocked: boolean
    additionalColorInformation: string | null
    barCodes: string[] | null
    classifications: string[] // Assuming you know the types of items in classifications array
    additionalFields: any | null // Specify further if structure is known
    suppliers: any[] // Assuming you know the types of items in suppliers array
    manufacturers: any | null // Specify further if structure is known
    referenceCategories: any | null // Specify further if structure is known
    referenceCodeSequences: any | null // Specify further if structure is known
    webData: any | null // Specify further if structure is known
    details: any | null // Specify further if structure is known
    branchesProductBlocked: any | null // Specify further if structure is known
  }
  