import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface DeleteCategoryUseCaseRequest {
  id: number
}

export interface DeleteCategoryUseCaseResponse {
  category: Category
}

export class DeleteCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    id,
  }: DeleteCategoryUseCaseRequest): Promise<DeleteCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    await this.categoriesRepository.delete(category)

    return {
      category,
    }
  }
}
