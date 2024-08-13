import { Color, Prisma, Product, ProductImage, Size, Sku } from '@prisma/client'
// import { PaginationParams } from '@/core/repositories/pagination-params'
interface SkuWithVariants extends Sku {
  color: Color
  size: Size
  product_images: ProductImage[]
}
export interface FindBySlugResponse extends Product {
  skus: SkuWithVariants[]
}

export interface ProductsRepository {
  findById(id: number): Promise<Product | null>
  findByTitle(title: string): Promise<Product | null>
  findBySlug(slug: string): Promise<FindBySlugResponse | null>
  searchMany(query: string, page: number, perPage: number): Promise<Product[]>
  listRecentProducts(): Promise<Product[] | null>
  count(query: string): Promise<number>
  create(data: Prisma.ProductCreateInput): Promise<Product>
  updateInfo(product: Product): Promise<void>
  delete(product: Product): Promise<void>
}
