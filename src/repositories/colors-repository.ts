import { Color, Prisma } from '@prisma/client'

export interface ColorsRepository {
  findById(id: number): Promise<Color | null>
  findByCode(code: string): Promise<Color | null>
  findByTitle(title: string): Promise<Color[] | null>
  create(data: Prisma.ColorCreateInput): Promise<Color>
  list(): Promise<Color[] | null>
  searchMany(query: string, page: number, perPage: number): Promise<Color[]>
  count(query: string): Promise<number>
  update(color: Color): Promise<void>
  delete(color: Color): Promise<void>
}
