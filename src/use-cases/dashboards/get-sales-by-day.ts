import { OrdersRepository, SalesByDayAndOperationCode } from '@/repositories/orders-repository'
import { Decimal } from '@prisma/client/runtime/library';


interface SalesByDate {
  date: string;
  [operationCode: string]: number | string;
}

interface GetSalesByDayUseCaseRequest {
  startDate: Date
  endDate: Date
}

interface GetSalesByDayUseCaseResponse {
  result: SalesByDate[]
}

export class GetSalesByDayUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ startDate, endDate }: GetSalesByDayUseCaseRequest): Promise<GetSalesByDayUseCaseResponse> {
    const orders = await this.ordersRepository.getSalesByDayAndOperationCode(startDate, endDate)

        // Get a unique list of all operation codes that exist in the period
    const operationCodes = [...new Set(orders.map(order => order.operation_code))];

    // Format the result into the desired structure
    const formattedOrders = orders.reduce<Record<string, SalesByDate>>((acc, order) => {
      if (order.totvs_creation_date) { // Ensure totvs_creation_date is not null
        const date = order.totvs_creation_date.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'

        // Initialize the date object if it doesn't exist
        if (!acc[date]) {
          acc[date] = { date };
          
          // Initialize all operation codes with 0 for the date
          operationCodes.forEach(code => {
            if (code) acc[date][code] = 0;
          });
        }

        // Ensure operation_code is not null, then add the sales value
        if (order.operation_code) {
          const totalValue = (order._sum.total_value as Decimal).toNumber(); // Convert Decimal to number
          acc[date][order.operation_code] = totalValue;
        }
      }

      return acc;
    }, {});

    // Convert the object into an array of objects
    const result = Object.values(formattedOrders);

    return { result }
  }
}