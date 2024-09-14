import { Prisma, Order } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library';

export interface SalesByDayAndOperationCode {
  operation_code: string | null;  // Assuming operation_code is a string
  totvs_creation_date: Date | null;
  _sum: {
    total_value: Decimal | null;  // total_value could be null if no sum exists
  };
}

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  findByCode(code: string): Promise<Order | null>
  getDetailsById(id: string): Promise<Order | null> // FIX ME
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  list(): Promise<Order[] | null>
  listByUserId(userId: string): Promise<Order[] | null>
  searchMany(
    query: string,
    totvsStatus: string,
    operationCode: string,
    page: number,
    perPage: number,
  ): Promise<Order[]>
  count(
    query: string,
    totvsStatus: string,
    operationCode: string,
  ): Promise<number>
  update(order: Order): Promise<void>
  delete(order: Order): Promise<void>

  // Dashboard queries

  getSalesByDayAndOperationCode(startDate: Date, endDate: Date): Promise<SalesByDayAndOperationCode[]>
}
