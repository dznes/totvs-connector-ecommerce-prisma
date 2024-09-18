import { Prisma, Classification, Product } from '@prisma/client'

export interface ClassificationWithProducts extends Classification {
  products: Product[]
}

export interface ClassificationsRepository {
  findById(id: number): Promise<Classification | null>
  findByCode(code: string): Promise<Classification | null>
  findBySlug(slug: string): Promise<ClassificationWithProducts | null>
  create(data: Prisma.ClassificationCreateInput): Promise<Classification>
  addProductsToClassification(
    classificationId: number,
    productIds: number[],
  ): Promise<Classification>
  list(): Promise<Classification[] | null>
  searchMany(query: string, page: number, perPage: number): Promise<Classification[]>
  count(query: string): Promise<number>
  update(classification: Classification): Promise<void>
  delete(classification: Classification): Promise<void>
}