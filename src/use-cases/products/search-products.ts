import { ProductsRepository, ProductWithSkuAndVariants } from '@/repositories/products-repository'

interface SearchProductsUseCaseRequest {
  query: string
  productCode: string
  integrationCode: string
  page: number
  perPage: number
}

export interface SearchProductsUseCaseResponse {
  products: ProductWithSkuAndVariants [] 
  count: number
  totalPages: number
}

export class SearchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    query,
    productCode,
    integrationCode,
    page,
    perPage,
  }: SearchProductsUseCaseRequest): Promise<SearchProductsUseCaseResponse> {
    const products = await this.productsRepository.searchMany(
      query,
      productCode,
      integrationCode,
      page,
      perPage,
    )
    const count = await this.productsRepository.count(query, productCode, integrationCode)
    const totalPages = Math.ceil(count / perPage)

      // Define the custom order for the sizes
  const sizeOrder = ["PP", "P", "M", "G", "GG", "UN", "U", "36", "38", "40", "42", "44"];

    // Sort the SKUs within each product by color.title, then by size.title according to sizeOrder
    products.forEach(product => {
      product.skus.sort((a, b) => {
        // First, compare by color title
        const colorComparison = a.color.title.localeCompare(b.color.title);
        if (colorComparison !== 0) {
          return colorComparison;
        }

        // Then, compare by size title using the custom order
        const aSizeIndex = sizeOrder.indexOf(a.size.title);
        const bSizeIndex = sizeOrder.indexOf(b.size.title);

        // If size is not found in sizeOrder, consider it as larger
        if (aSizeIndex === -1) return 1;
        if (bSizeIndex === -1) return -1;

        return aSizeIndex - bSizeIndex;
      });
    });

    return {
      products,
      count,
      totalPages,
    }
  }
}
