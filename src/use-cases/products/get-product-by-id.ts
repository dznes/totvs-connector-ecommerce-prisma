import { ProductsRepository, ProductWithSkuAndVariants } from '@/repositories/products-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetProductByIdUseCaseRequest {
  id: number
}

interface GetProductByIdUseCaseResponse {
  product: ProductWithSkuAndVariants
}

export class GetProductByIdUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: GetProductByIdUseCaseRequest): Promise<GetProductByIdUseCaseResponse> {
    const product = await this.productsRepository.findById(id)

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
