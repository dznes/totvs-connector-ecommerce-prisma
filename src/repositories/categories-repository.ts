import { Prisma, Category, Product } from '@prisma/client'

export interface CategoryWithProducts extends Category {
  products: Product[]
}

export interface CategoriesRepository {
  findById(id: number): Promise<Category | null>
  findByTitle(title: string): Promise<Category | null>
  findBySlug(slug: string): Promise<CategoryWithProducts | null>
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  addProductsToCategory(
    categoryId: number,
    productIds: number[],
  ): Promise<Category>
  list(): Promise<Category[] | null>
  searchMany(query: string, page: number, perPage: number): Promise<Category[]>
  count(query: string): Promise<number>
  update(category: Category): Promise<void>
  delete(category: Category): Promise<void>
}
