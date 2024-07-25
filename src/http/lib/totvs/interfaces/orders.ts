import { Address } from './user-info'

export interface EletronicInvoice {
  accessKey: string
  electronicInvoiceStatus: string
  receipt: number
  receivementDate: Date
}

export interface OrderItem {
  productCode: number
  name: string
  quantity: number
  referenceCode: string | null
  referenceName: string | null
  productSku: string | null
  colorCode: string
  colorName: string
  sizeName: string
  toSettleQuantity: number | null
  settledQuantity: number | null
  canceledQuantity: number | null
  extraQuantity: number | null
  pendingQuantity: number | null
  originalPrice: number
  price: number
  discountPercentage: number | null
  lastChangeUserInsert: number | null
  lastChangeDate: Date | null
  billingForecastDate: Date | null
  insertDate: Date
  billingLimitDate: Date | null
  lastBillingDate: Date | null
}

export interface OrderInvoice {
  code: number
  accessKey: string | null
  serial: string
  issueDate: string
  status: string
  shippingCompanyName: string
  packageNumber: number
  grossWeight: number
  netWeight: number
  trackingCode: string
  discountPercentage: number
  quantity: number
  productValue: number
  additionalValue: number
  shippingValue: number
  InsuranceValue: number
  ipiValue: number
  totalValue: number
  transactionBranchCode: number
  transactionDate: string
  transactionCode: number
  electronic: EletronicInvoice | null
}

export interface Order {
  branchCode: number
  orderCode: number
  orderId: string | null
  customerOrderCode: string | null
  insertDate: Date
  integrationCode: string | null
  sellerCode: number | null
  sellerCpfCnpj: string | null
  orderDate: Date
  arrivalDate: string | null
  customerCode: number
  customerCpfCnpj: string | null
  representativeCode: number | null
  reprensentativeCpfCnpj: string | null
  representativeName: string | null
  operationCode: number
  operationName: string
  paymentConditionCode: number
  paymentConditionName: string
  quantity: number
  grossValue: number
  discountValue: number
  netValue: number
  freightType: number
  freightValue: number
  shippingCompanyCode: number | null
  shippingCompanyCpfCnpj: string | null
  shippingCompanyName: string | null
  totalAmountOrder: number
  statusOrder: string
  reasonBlockingCode: number | null
  reasonBlockingDescription: string | null
  hasPdvTransaction: boolean | null
  priceTableCode: number | null
  shippingService: string | null
  shippingServiceName: string | null
  items: OrderItem[] | []
  invoices: OrderInvoice[] | []
  shippingAddress: Address
}
