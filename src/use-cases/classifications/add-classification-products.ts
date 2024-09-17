import { ClassificationsRepository } from '@/repositories/classifications-repository'
import { Classification } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ProductsRepository } from '@/repositories/products-repository'

interface AddClassificationProductsUseCaseRequest {
  classificationId: number
  productIds: number[]
}

export interface AddClassificationProductsUseCaseResponse {
  classification: Classification
}

export class AddClassificationProductsUseCase {
  constructor(
    private classificationsRepository: ClassificationsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    classificationId,
    productIds,
  }: AddClassificationProductsUseCaseRequest): Promise<AddClassificationProductsUseCaseResponse> {
    const checkClassificationExists =
      await this.classificationsRepository.findById(classificationId)

    if (!checkClassificationExists) {
      throw new ResourceNotFoundError()
    }

    // Assuming productIds is an array of numbers, each representing a productId
    const checkProductsExistPromises = productIds.map((productId) =>
      this.productsRepository
        .findById(productId)
        .then((result) => ({ productId, exists: result != null })),
    )

    // This will return an array of objects with productId and exists properties
    const productsExistence = await Promise.all(checkProductsExistPromises)

    // Filter out the products that exist and map to their productIds
    const existingProductIds = productsExistence
      .filter((product) => product.exists)
      .map((product) => product.productId)

    const classification = await this.classificationsRepository.addProductsToClassification(
      classificationId,
      existingProductIds,
    )

    return { classification }
  }
}
