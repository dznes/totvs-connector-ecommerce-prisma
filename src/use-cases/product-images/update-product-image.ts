import { ProductImagesRepository } from '@/repositories/product-images-repository'
import { SkusRepository } from '@/repositories/skus-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateProductImageUseCaseRequest {
  code: string
  title?: string
  file_key?: string
  color?: string
  slug?: string
  content_type?: string
  position?: number
  sku_code?: string
}

export class UpdateProductImageUseCase {
  constructor(
    private productImagesRepository: ProductImagesRepository,
    private skusRepository: SkusRepository,
  ) {}

  async execute({
    code,
    title,
    file_key,
    color,
    slug,
    content_type,
    position,
    sku_code,
  }: UpdateProductImageUseCaseRequest) {
    const productImageExists =
      await this.productImagesRepository.findByCode(code)

    if (!productImageExists) {
      throw new ResourceNotFoundError()
    }

    if (sku_code) {
      const skuExists = await this.skusRepository.findByCode(sku_code)

      if (!skuExists) {
        throw new ResourceNotFoundError()
      }

      await this.productImagesRepository.update({
        ...productImageExists,
        title: title ?? productImageExists.title,
        file_key: file_key ?? productImageExists.file_key,
        color: color ?? productImageExists.color,
        slug: slug ?? productImageExists.slug,
        content_type: content_type ?? productImageExists.content_type,
        position: position ?? productImageExists.position,
        sku_code: skuExists.code,
      })
    } else {
      await this.productImagesRepository.update({
        ...productImageExists,
        title: title ?? productImageExists.title,
        file_key: file_key ?? productImageExists.file_key,
        color: color ?? productImageExists.color,
        slug: slug ?? productImageExists.slug,
        content_type: content_type ?? productImageExists.content_type,
        position: position ?? productImageExists.position,
      })
    }
  }
}
