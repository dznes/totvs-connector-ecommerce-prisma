export interface Payment {
    payment_method: string
    credit_card: {
      recurrence: boolean
      installments: number
      statement_descriptor: string
      card?: {
        number: string
        holder_name: string
        cvv: string
        billing_address: {
          street: string
          zip_code: string
          city: string
          state: string
          country: string
        }
      }
      card_token?: string
    }
}