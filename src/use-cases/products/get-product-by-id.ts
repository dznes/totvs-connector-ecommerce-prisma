import { ProductsRepository, ProductWithSkuAndVariants } from '@/repositories/products-repository'
import { Product } from '@prisma/client'
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

    return { product }
  }
}
