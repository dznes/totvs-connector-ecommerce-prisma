import { ProductImagesRepository } from '@/repositories/product-images-repository'
import { ProductImage } from '@prisma/client'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { randomUUID } from 'node:crypto'
import { SkusRepository } from '@/repositories/skus-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreateProductImageUseCaseRequest {
  code?: string
  title: string
  file_key?: string
  color?: string
  slug?: string
  content_type?: string
  position?: number
  sku_code: string
}

interface CreateProductImageUseCaseResponse {
  productImage: ProductImage
}

export class CreateProductImageUseCase {
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
  }: CreateProductImageUseCaseRequest): Promise<CreateProductImageUseCaseResponse> {
    if (!code) {
      code = randomUUID()
    }

    const productImageExists =
      await this.productImagesRepository.findByCode(code)

    if (productImageExists) {
      throw new ResourceAlreadyExistsError()
    }

    const skuExists = await this.skusRepository.findByCode(sku_code)

    if (!skuExists) {
      throw new ResourceNotFoundError()
    }

    const productImage = await this.productImagesRepository.create({
      code: code ?? randomUUID(),
      title,
      file_key: file_key ?? '',
      color: color ?? '',
      slug: slug ?? '',
      content_type: content_type ?? '',
      position,
      sku_code: skuExists.code,
    })

    return { productImage }
  }
}
