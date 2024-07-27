import { Prisma, Product } from '@prisma/client'
// import { PaginationParams } from '@/core/repositories/pagination-params'

export interface ProductsRepository {
  findById(id: number): Promise<Product | null>
  findByTitle(title: string): Promise<Product | null>
  findBySlug(slug: string): Promise<Product | null>
  searchMany(query: string, page: number, perPage: number): Promise<Product[]>
  listRecentProducts(): Promise<Product[] | null>
  count(query: string): Promise<number>
  create(data: Prisma.ProductCreateInput): Promise<Product>
  updateInfo(product: Product): Promise<void>
  delete(product: Product): Promise<void>
}
