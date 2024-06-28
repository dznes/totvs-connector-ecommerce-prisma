import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findByCode(code: string) {
    const user = await prisma.user.findUnique({
      where: {
        code,
      },
    })
    return user
  }

  async findByIdWithNested(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        addresses: true,
        phones: true,
      },
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async list() {
    const user = await prisma.user.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
    return user
  }

  async searchMany(query: string, page: number, perPage: number) {
    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
                contains: query,
              },
              email: {
                contains: query,
              },
              cpf: {
                contains: query,
              },
              rg: {
                  contains: query,
             },
          },
        ],
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })
    return user
  }

  async count(query: string) {
    const user = await prisma.user.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
            email: {
              contains: query,
            },
            cpf: {
              contains: query,
            },
            rg: {
                contains: query,
            },
          },
        ],
      },
    })
    return user
  }

  async update(user: User) {
    await prisma.user.update({
      where: { id: user.id },
      data: user,
    })
  }

  async delete(user: User) {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    })
  }
}
