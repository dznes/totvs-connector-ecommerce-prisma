import { ProductImage, Prisma } from '@prisma/client'

export interface ProductImagesRepository {
  findById(id: number): Promise<ProductImage | null>
  findByCode(code: string): Promise<ProductImage | null>
  findByTitle(title: string): Promise<ProductImage[] | null>
  create(data: Prisma.ProductImageUncheckedCreateInput): Promise<ProductImage>
  list(): Promise<ProductImage[] | null>
  searchMany(
    query: string,
    page: number,
    perPage: number,
  ): Promise<ProductImage[]>
  count(query: string): Promise<number>
  update(color: ProductImage): Promise<void>
  delete(color: ProductImage): Promise<void>
}
