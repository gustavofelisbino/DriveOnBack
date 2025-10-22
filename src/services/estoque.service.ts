import { prisma } from '../prisma/client';

export const EstoqueService = {
  list: () => prisma.estoque.findMany({ orderBy: { id: "desc" } }),
  getById: (id: number) => prisma.estoque.findUnique({ where: { id } }),
  create: (data: any) => prisma.estoque.create({ data }),
  update: (id: number, data: any) => prisma.estoque.update({ where: { id }, data }),
  remove: (id: number) => prisma.estoque.delete({ where: { id } }),
};
