import { ProductsRepository, ProductWithSkuAndVariants } from '@/repositories/products-repository'

interface SearchProductsUseCaseRequest {
  query: string
  page: number
  perPage: number
}

export interface SearchProductsUseCaseResponse {
  products: ProductWithSkuAndVariants [] 
  count: number
  totalPages: number
}

// function checkStock(products: ProductWithSkuAndVariants[]): (ProductWithSkuAndVariants & { in_stock: boolean })[] {
//   return products.map(product => {
//     const totalStock = product.skus.reduce((sum, sku) => sum + (sku.stock_available || 0), 0);
//     const inStock = totalStock > 0;

//     return {
//       ...product,
//       in_stock: inStock,
//     };
//   });
// }

export class SearchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    query,
    page,
    perPage,
  }: SearchProductsUseCaseRequest): Promise<SearchProductsUseCaseResponse> {
    const products = await this.productsRepository.searchMany(
      query,
      page,
      perPage,
    )
    const count = await this.productsRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      products,
      count,
      totalPages,
    }
  }
}
