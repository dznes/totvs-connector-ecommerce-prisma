import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetProductBySlugUseCaseRequest {
  productSlug: string
}

interface GetProductBySlugUseCaseResponse {
  product: Product
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
