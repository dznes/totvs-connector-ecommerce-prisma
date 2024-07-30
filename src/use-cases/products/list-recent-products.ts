import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListRecentProductsUseCaseResponse {
  products: Product[]
}

export class ListRecentProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<ListRecentProductsUseCaseResponse> {
    const products = await this.productsRepository.listRecentProducts()

    if (!products) {
      throw new ResourceNotFoundError()
    }

    return { products }
  }
}
