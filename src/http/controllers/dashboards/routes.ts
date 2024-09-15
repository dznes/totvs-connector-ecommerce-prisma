import { FastifyInstance } from 'fastify'
import { getSalesByDay } from './get-sales-by-day'
import { prisma } from '@/lib/prisma';

export async function DashboardRoutes(app: FastifyInstance) {
  app.get('/api/dashboard/sales-by-day', getSalesByDay)
  app.get('/api/dashboard/sales-30-days', async (request, reply) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
      try {
        const totalSales = await prisma.order.aggregate({
          _sum: {
            total_value: true,
          },
          where: {
            created_at: {
              gte: thirtyDaysAgo,
            },
            status: 200, // Assuming 1 represents a successful order
          },
        });
    
        return totalSales._sum.total_value || 0;
      } catch (error) {
        console.error('Error retrieving total sales:', error);
        throw error;
      }
    
  })
  app.get('/api/dashboard/sales-30-days-faturado', async (request, reply) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
        // Fetch the order items from the last 30 days with settled_quantity > 0 and related orders with status 200
        const orderItems = await prisma.orderItem.findMany({
            where: {
                created_at: {
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
            },
        });

        // Calculate the total sales by multiplying price * settled_quantity for each item, applying the discount
        const totalSalesValue = orderItems.reduce((total, item) => {
            // Convert Decimal to number and handle null values
            const price = item.price ? item.price.toNumber() : 0; // Default to 0 if price is null
            const quantity = item.settled_quantity ? item.settled_quantity : 0; // Default to 0 if settled_quantity is null
            const discount = item.discount_percentage ? item.discount_percentage / 100 : 0; // Default to 0 if no discount

            // Apply the discount to the price
            const finalPrice = price * (1 - discount);

            // Add to total
            return total + (finalPrice * quantity);
        }, 0);

        return totalSalesValue || 0;
    } catch (error) {
        console.error('Error retrieving total sales:', error);
        throw error;
    }
  });
}
