import { FindBySlugResponse, ProductsRepository } from '@/repositories/products-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'


interface GetProductBySlugUseCaseRequest {
  productSlug: string
}

interface GetProductBySlugUseCaseResponse {
  product: FindBySlugResponse
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

    return { product }
  }
}
