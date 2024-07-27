import { ColorsRepository } from '@/repositories/colors-repository'

interface UpsertColorUseCaseRequest {
  code: string
  status: number
  title: string
  variation_type: number
  background_color?: string
  image_tags?: string
  image_url?: string
  image_text?: string
  image_label?: string
}

export class UpsertColorUseCase {
  constructor(private colorsRepository: ColorsRepository) {}

  async execute({
    code,
    status,
    title,
    variation_type,
    background_color,
    image_tags,
    image_url,
    image_text,
    image_label,
  }: UpsertColorUseCaseRequest) {
    const color = await this.colorsRepository.findByCode(code)

    if (color) {
      await this.colorsRepository.update({
        ...color,
        code,
        status,
        title,
        variation_type,
        background_color: background_color ?? color.background_color,
        image_tags: image_tags ?? color.image_tags,
        image_url: image_url ?? color.image_url,
        image_text: image_text ?? color.image_text,
        image_label: image_label ?? color.image_label,
      })
    } else {
      await this.colorsRepository.create({
        code,
        status,
        title,
        variation_type,
        background_color,
        image_tags,
        image_url,
        image_text,
        image_label,
      })
    }
  }
}
