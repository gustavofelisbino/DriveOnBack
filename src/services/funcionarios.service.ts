import { prisma } from "../prisma/client";

export const FuncionariosService = {
  list: () => prisma.funcionario.findMany({ include: { oficina: true } }),
  getById: (id: number) => prisma.funcionario.findUnique({ where: { id }, include: { oficina: true } }),
  create: (data: any) => prisma.funcionario.create({ data }),
  update: (id: number, data: any) => prisma.funcionario.update({ where: { id }, data }),
  remove: (id: number) => prisma.funcionario.delete({ where: { id } }),
};
