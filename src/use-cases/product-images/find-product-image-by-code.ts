import { ProductImagesRepository } from '@/repositories/product-images-repository'
import { ProductImage } from '@prisma/client'

interface FindProductImageByCodeUseCaseRequest {
  code: string
}

interface FindProductImageByCodeUseCaseResponse {
  productImage: ProductImage
}

export class FindProductImageByCodeUseCase {
  constructor(private productImagesRepository: ProductImagesRepository) {}

  async execute({
    code,
  }: FindProductImageByCodeUseCaseRequest): Promise<FindProductImageByCodeUseCaseResponse | null> {
    const productImage = await this.productImagesRepository.findByCode(code)

    if (productImage) {
      return { productImage }
    } else {
      return null
    }
  }
}
