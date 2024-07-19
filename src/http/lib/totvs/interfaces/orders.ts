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
  insertDate: Date | null
  billingLimitDate: Date | null
  lastBillingDate: Date | null
}

export interface OrderInvoice {
  code: number
  accessKey: string | null
  serial: string | null
  issueDate: Date
  status: string
  shippingCompanyName: string | null
  packageNumber: string | null
  grossWeight: number | null
  netWeight: number | null
  trackingCode: string | null
  discountPercentage: number | null
  quantity: number
  productValue: number
  additionalValue: number | null
  shippingValue: number | null
  InsuranceValue: number | null
  ipiValue: number | null
  totalValue: number
  transactionBranchCode: number | null
  transactionDate: Date | null
  transactionCode: number | null
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
  arrivalDate: Date | null
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
