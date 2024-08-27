import { ProductWithSkuAndVariants, ProductsRepository } from '@/repositories/products-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'


interface GetProductBySlugUseCaseRequest {
  productSlug: string
}

interface GetProductBySlugUseCaseResponse {
  product: ProductWithSkuAndVariants
}

export class GetProductBySlugUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productSlug,
  }: GetProductBySlugUseCaseRequest): Promise<GetProductBySlugUseCaseResponse> {
    const product = await this.productsRepository.findBySlug(productSlug)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    // Define the custom order for the sizes
    const sizeOrder = ["PP", "P", "M", "G", "GG", "UN", "U", "36", "38", "40", "42", "44"];

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

    return { product }
  }
}
