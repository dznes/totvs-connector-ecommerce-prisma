import { FastifyInstance } from 'fastify'
import { getSalesByDay } from './get-sales-by-day'
import { prisma } from '@/lib/prisma';

export async function DashboardRoutes(app: FastifyInstance) {
  app.get('/api/dashboard/sales-by-day', getSalesByDay)
  app.get('/api/dashboard/test', async (request, reply) => {
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
}
