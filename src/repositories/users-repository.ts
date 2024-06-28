import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByCode(code: string): Promise<User | null>
  findByIdWithNested(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  list(): Promise<User[] | null>
  searchMany(query: string, page: number, perPage: number): Promise<User[]>
  count(query: string): Promise<number>
  update(user: User): Promise<void>
  delete(user: User): Promise<void>
}
