import { prisma } from "../prisma/client";

type ClienteInput = {
  nome: string;
  email?: string;
  telefone?: string;
  observacoes?: string;
  oficinaId: number;
};

export class ClienteService {
  async listar(oficinaId: number) {
    return await prisma.cliente.findMany({
      where: { oficina_id: oficinaId },
      orderBy: { nome: "asc" },
    });
  }

  async criar(data: ClienteInput) {
    if (!data.nome) {
      throw new Error("Nome é obrigatório.");
    }

    return await prisma.cliente.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        observacao: data.observacoes,
        oficina_id: data.oficinaId,
      },
    });
  }

  async atualizar(id: number, data: ClienteInput) {
    const cliente = await prisma.cliente.findFirst({
      where: { id, oficina_id: data.oficinaId },
    });

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    return await prisma.cliente.update({
      where: { id },
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        observacao: data.observacoes,
      },
    });
  }

  async deletar(id: number, oficinaId: number) {
    const cliente = await prisma.cliente.findFirst({
      where: { id, oficina_id: oficinaId },
    });

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    await prisma.cliente.delete({ where: { id } });
  }
}
