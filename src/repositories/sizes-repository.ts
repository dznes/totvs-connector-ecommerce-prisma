import { Prisma, Size } from '@prisma/client'

export interface SizesRepository {
  findById(id: number): Promise<Size | null>
  findByCode(code: string): Promise<Size | null>
  findByTitle(title: string): Promise<Size[] | null>
  create(data: Prisma.SizeCreateInput): Promise<Size>
  list(): Promise<Size[] | null>
  searchMany(query: string, page: number, perPage: number): Promise<Size[]>
  count(query: string): Promise<number>
  update(size: Size): Promise<void>
  delete(size: Size): Promise<void>
}
