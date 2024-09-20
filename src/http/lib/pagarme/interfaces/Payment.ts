interface Split {
  amount: number
  recipient_id: string // format: rp_XXXXXXXXXXXXXXXX
  type: 'percentage' | 'flat'
  options: {
    charge_processing_fee: boolean
    charge_remainder_fee: boolean
    liable: boolean
  }
}


export interface Payment {
    payment_method: 'credit_card' | 'boleto' | 'voucher' | 'bank_transfer' | 'safety_pay' | 'checkout' | 'cash' | 'pix'
    credit_card?: {
      recurrence: boolean
      installments: number
      statement_descriptor: string
      card_token?: string
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
    }
    boleto?: {
      bank: string
      instructions: string
      due_at: string
      nosso_numero: string
      type: string
      document_number: string
      interest?: {
        days: number
        type: string
        amount: string // in percentage or cents
      }
      fine?: {
        days: number
        type: string
        amount: number // in percentage or cents
      }
    }
    pix?: {
      expires_in?: number
      expires_at?: Date // expires_at is required if expires_in is not provided
      additional_information?: {
        name: string
        value: string
      }
    }
    amount?: number // in cents
    split?: Split[]
}