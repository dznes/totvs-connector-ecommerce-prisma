import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ProductsRepository } from '@/repositories/products-repository'

interface AddProductsByCategoryTitlesUseCaseRequest {
  categoryId: number
}

export interface AddProductsByCategoryTitleUseCaseResponse {
  category: Category
}

export class AddProductsByCategoryTitleProductsUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    categoryId,
  }: AddProductsByCategoryTitlesUseCaseRequest): Promise<AddProductsByCategoryTitleUseCaseResponse> {
    const checkCategoryExists =
      await this.categoriesRepository.findById(categoryId)

    if (!checkCategoryExists) {
      throw new ResourceNotFoundError()
    }
    
    const title = checkCategoryExists.title.toUpperCase();

    const products = await this.productsRepository.listByTitleProductsWithImageAndStock(
        title,
    )
    if (!products) {
      throw new ResourceNotFoundError()
    }
    
    const productIds = products.map(product => product.id)

    const category = await this.categoriesRepository.addProductsToCategory(
      categoryId,
      productIds,
    )

    return { category }
  }
}
