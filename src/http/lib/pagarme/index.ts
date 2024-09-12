import { env } from "@/env"
import { Card } from "./interfaces/Card"
import { Customer } from "./interfaces/Customer"
import { Shipping } from "./interfaces/Shipping"
import { Payment } from "./interfaces/Payment"
import { Item } from "./interfaces/Item"

interface CreateCardTokenRequest {
    type: string
    card: Card
}

interface CreateOrderRequest {
    customer: Customer
    shipping: Shipping
    payments: Payment[]
    items: Item[]
}

const url = "https://api.pagar.me/core/v5"
const app_pk = env.PAGARME_PUBLIC_KEY
const app_sk = env.PAGARME_PRIVATE_KEY

export async function createCardToken({ type, card }: CreateCardTokenRequest) {
    const response = await fetch(
        `${url}/tokens?appId=${app_pk}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(`${app_sk}:`).toString('base64')}`,
          },
          body: JSON.stringify({ type, card}),
        },
    )

    if (response.ok) {
        const { id, type, created_at, expires_at, card } = await response.json()
        return { id, type, created_at, expires_at, card }
    } else {
        const error = await response.json()
        return { error }
    }
}

export async function createOrderPayment({ customer, shipping, payments, items }: CreateOrderRequest) {
    const response = await fetch('https://api.pagar.me/core/v5/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(`${app_sk}:`).toString('base64')}`,
        },
        body: JSON.stringify({ customer, shipping, payments, items }),
      })

    if (response.ok) {
        const jsonResponse = await response.json()
        console.log(jsonResponse)
        return { jsonResponse }
    } else {
        const error = await response.json()
        console.log(error)
        return { error }
    }
}