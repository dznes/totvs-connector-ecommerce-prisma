import { ColorsRepository } from '@/repositories/colors-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateColorUseCaseRequest {
  code: string
  backgroundColor: string
}

export class UpdateColorsUseCase {
  constructor(private colorsRepository: ColorsRepository) {}

  async execute({ code, backgroundColor }: UpdateColorUseCaseRequest) {
    const color = await this.colorsRepository.findByCode(code)

    if (!color) {
      throw new ResourceNotFoundError()
    }

    await this.colorsRepository.update({
      ...color,
      background_color: backgroundColor,
      updated_at: new Date(),
    })
  }
}
