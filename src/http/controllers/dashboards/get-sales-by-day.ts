import { makeGetSalesByDayUseCase } from '@/use-cases/factories/dashboards/make-get-sales-by-day'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

// Function to calculate the date 30 days before today
const getDefaultStartDate = () => {
  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 30) // Subtract 30 days
  return thirtyDaysAgo
}

export async function getSalesByDay(request: FastifyRequest, reply: FastifyReply) {
  const getSalesByDayQuerySchema = z.object({
    startDate: z.date().default(getDefaultStartDate), // Default to 30 days ago
    endDate: z.date().default(new Date())  // Default to today
  })

  const { startDate, endDate } =
    getSalesByDayQuerySchema.parse(request.query)

  const getSalesByDayUseCase = makeGetSalesByDayUseCase()

  const { result } = await getSalesByDayUseCase.execute({
    startDate, endDate
  })

  return reply.status(200).send({
    result,
  })
}
