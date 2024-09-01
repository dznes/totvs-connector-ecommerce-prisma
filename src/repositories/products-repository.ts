import { Color, Prisma, Product, ProductImage, Size, Sku } from '@prisma/client'
// import { PaginationParams } from '@/core/repositories/pagination-params'
interface SkuWithVariants extends Sku {
  color: Color
  size: Size
  product_images: ProductImage[]
}
export interface ProductWithSkuAndVariants extends Product {
  skus: SkuWithVariants[]
}

export interface ProductsRepository {
  findById(id: number): Promise<ProductWithSkuAndVariants | null>
  findByTitle(title: string): Promise<Product | null>
  findBySlug(slug: string): Promise<ProductWithSkuAndVariants | null>
  searchMany(query: string, productCode: string, integrationCode: string, page: number, perPage: number): Promise<ProductWithSkuAndVariants[]>
  searchOnlyWithImageAndStock(query: string, productCode: string, integrationCode: string, page: number, perPage: number): Promise<ProductWithSkuAndVariants[]>
  listRecentProducts(): Promise<Product[] | null>
  count(query: string, productCode: string, integrationCode: string): Promise<number>
  create(data: Prisma.ProductCreateInput): Promise<Product>
  updateInfo(product: Product): Promise<void>
  delete(product: Product): Promise<void>
}
