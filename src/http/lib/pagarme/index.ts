import { env } from "@/env"
import { Card } from "./interfaces/Card"

interface CreateCardTokenRequest {
    type: string
    card: Card
}

const url = "https://api.pagar.me/core/v5"
const app_pk = env.PAGARME_PUBLIC_KEY
const app_sk = env.PAGARME_PRIVATE_KEY

export async function CreateCardToken({ type, card }: CreateCardTokenRequest) {
    const response = await fetch(
        `${url}/tokens?appId=${app_pk}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic' + Buffer.from(app_sk).toString('base64'),
          },
          body: JSON.stringify({ type, card}),
        },
    )

    const responseBody = await response.json()

    if (response.ok) {
    const card = responseBody
    return new Response(JSON.stringify({ card }), {
        status: 201,
    })
    } else {
    const error = responseBody.message
    return new Response(JSON.stringify({ message: error }), {
        status: response.status,
    })
    }
}