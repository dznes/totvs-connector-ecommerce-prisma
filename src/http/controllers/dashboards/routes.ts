import { FastifyInstance } from 'fastify'
import { getSalesByDay } from './get-sales-by-day'
import { prisma } from '@/lib/prisma'

export async function DashboardRoutes(app: FastifyInstance) {
  app.get('/api/dashboard/sales-by-day', getSalesByDay)
  app.get('/api/dashboard/sales-30-days', async () =>
    // request, reply
    {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      try {
        const totalSales = await prisma.order.aggregate({
          _sum: {
            total_value: true,
          },
          where: {
            totvs_creation_date: {
              gte: thirtyDaysAgo,
            },
            status: 200, // Assuming 1 represents a successful order
          },
        })

        return totalSales._sum.total_value || 0
      } catch (error) {
        console.error('Error retrieving total sales:', error)
        throw error
      }
    },
  )
  app.get('/api/dashboard/sales-30-days-faturado', async () =>
    // request, reply
    {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      try {
        // Define the type for grouped sales
        type OperationCodes = '500' | '510' | '702' | '704'
        interface SalesByDate {
          '500': number
          '510': number
          '702': number
          '704': number
          date: string
        }

        // Initialize groupedSales as an object with dynamic keys (dates)
        const groupedSales: Record<string, SalesByDate> = {}

        // Fetch the order items from the last 30 days
        const orderItems = await prisma.orderItem.findMany({
          where: {
            totvs_created_at: {
              gte: thirtyDaysAgo,
            },
            settled_quantity: {
              gt: 0, // Ensure that only items with settled_quantity are considered
            },
            order: {
              status: 200, // Assuming 200 represents a successful order status in the "Order" model
              totvs_order_status: {
                in: ['PartiallyAnswered', 'Attended'], // Only include orders with specific totvs_order_status values
              },
            },
          },
          select: {
            price: true,
            settled_quantity: true,
            discount_percentage: true,
            order: {
              select: {
                operation_code: true,
                totvs_creation_date: true,
              },
            },
          },
        })

        // Group sales by date and operation_code
        orderItems.forEach((item) => {
          // Handle the case where totvs_creation_date could be null
          if (!item.order.totvs_creation_date) return // Skip this item if the date is null

          const price = item.price ? item.price.toNumber() : 0
          const quantity = item.settled_quantity ? item.settled_quantity : 0
          const discount = item.discount_percentage
            ? item.discount_percentage / 100
            : 0
          const finalPrice = price * (1 - discount) * quantity

          const date = item.order.totvs_creation_date
            .toISOString()
            .split('T')[0] // Extract only the date part (YYYY-MM-DD)
          const operationCode = item.order.operation_code as OperationCodes // Cast operation_code to the allowed values

          // Initialize the date group if it doesn't exist
          if (!groupedSales[date]) {
            groupedSales[date] = {
              '500': 0,
              '510': 0,
              '702': 0,
              '704': 0,
              date,
            }
          }

          // Add the finalPrice to the correct operation_code in the grouped data
          if (operationCode in groupedSales[date]) {
            groupedSales[date][operationCode] += finalPrice
          }
        })

        // Convert the groupedSales object into an array for the final output
        const output = Object.values(groupedSales)

        return output
      } catch (error) {
        console.error('Error retrieving total sales:', error)
        throw error
      }
    },
  )
}
