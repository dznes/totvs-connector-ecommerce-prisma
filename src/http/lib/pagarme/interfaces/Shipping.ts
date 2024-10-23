export interface Shipping {
  address: {
    line_1: string
    zip_code: string
    city: string
    state: string
    country: string
  }
  amount: number
  description: string
  recipient_name: string
  recipient_phone: string
}
