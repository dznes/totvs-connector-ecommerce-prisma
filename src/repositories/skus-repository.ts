import { Prisma, Sku } from '@prisma/client'

export interface SkusRepository {
  findById(id: number): Promise<Sku | null>
  findByCode(code: string): Promise<Sku | null>
  findByTitle(title: string): Promise<Sku[] | null>
  findBySlug(slug: string): Promise<Sku | null>
  searchMany(query: string, page: number, perPage: number): Promise<Sku[]>
  count(query: string): Promise<number>
  create(data: Prisma.SkuCreateInput): Promise<Sku>
  update(sku: Sku): Promise<void>
  delete(sku: Sku): Promise<void>
  list(): Promise<Sku[] | null>
  listByProductCode(productCode: string): Promise<Sku[] | null>
  listByProductId(productId: number): Promise<Sku[] | null>
  searchMaterials(query: string, page: number, perPage: number): Promise<Sku[]>
}
