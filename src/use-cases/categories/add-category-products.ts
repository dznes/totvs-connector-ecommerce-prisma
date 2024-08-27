import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ProductsRepository } from '@/repositories/products-repository'

interface AddCategoryProductsUseCaseRequest {
  categoryId: number
  productIds: number[]
}

export interface AddCategoryProductsUseCaseResponse {
  category: Category
}

export class AddCategoryProductsUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    categoryId,
    productIds,
  }: AddCategoryProductsUseCaseRequest): Promise<AddCategoryProductsUseCaseResponse> {
    const checkCategoryExists =
      await this.categoriesRepository.findById(categoryId)

    if (!checkCategoryExists) {
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

    const category = await this.categoriesRepository.addProductsToCategory(
      categoryId,
      existingProductIds,
    )

    return { category }
  }
}
