import { ClassificationsRepository } from '@/repositories/classifications-repository'
import { Classification } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ProductsRepository } from '@/repositories/products-repository'

interface AddClassificationBySkuCodesProductsUseCaseRequest {
  classificationId: number
  skuCodes: number[]
}

export interface AddClassificationBySkuCodesProductsUseCaseResponse {
  classification: Classification
}

export class AddClassificationBySkuCodesProductsUseCase {
  constructor(
    private classificationsRepository: ClassificationsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    classificationId,
    skuCodes,
  }: AddClassificationBySkuCodesProductsUseCaseRequest): Promise<AddClassificationBySkuCodesProductsUseCaseResponse> {
    const checkClassificationExists =
      await this.classificationsRepository.findById(classificationId)

    if (!checkClassificationExists) {
      throw new ResourceNotFoundError()
    }

    // // Assuming productIds is an array of numbers, each representing a productId
    // const checkProductsExistPromises = skuCodes.map((skuCode) =>
    //   this.productsRepository
    //     .findBySkuCode(skuCode.toString())
    //     .then((result) => ({ id: result?.id, exists: result != null })),
    // )

    const checkProductsExistPromises = skuCodes.map((skuCode) =>
      this.productsRepository
        .findBySkuCode(skuCode.toString())
        .then((result) => ({ id: result?.id, exists: result != null }))
        .catch((error) => {
          console.error(`Error checking SKU: ${skuCode}`, error);
          return { id: null, exists: false };
        })
    );

    // This will return an array of objects with productId and exists properties
    const productsExistence = await Promise.all(checkProductsExistPromises)

    // Filter out the products that exist, map to their productIds, exclude undefined values,
    // and remove duplicates by using a Set
    const existingProductIds = Array.from(new Set(
      productsExistence
        .filter((product) => product.exists && product.id !== undefined)
        .map((product) => product.id as number)
    ))

    const classification = await this.classificationsRepository.addProductsToClassification(
      classificationId,
      existingProductIds,
    )

    return { classification }
  }
}
