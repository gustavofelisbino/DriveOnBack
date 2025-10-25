import { prisma } from "../prisma/client";

type ClienteInput = {
  nome: string;
  email?: string;
  telefone?: string;
  observacoes?: string;
  oficina_id?: number;
};

export const ClienteService = {
  async listar(oficinaId?: number) {
    const where = oficinaId ? { oficina_id: oficinaId } : {};

    return await prisma.cliente.findMany({
      where,
      orderBy: { nome: "asc" },
      include: {
        veiculos: true,
        ordens: true,
        pagamentos: true,
      },
    });
  },

  async getDetalhes(id: number, oficina_id?: number) {
    const where: any = { id };
    if (oficina_id) where.oficina_id = oficina_id;

    const cliente = await prisma.cliente.findFirst({
      where,
      include: {
        veiculos: true,
        ordens: {
          orderBy: { created_at: "desc" },
          include: { veiculo: true, funcionario: true },
        },
        pagamentos: {
          orderBy: { data_vencimento: "desc" },
        },
      },
    });

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    return cliente;
  },

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
        oficina_id: data.oficina_id ?? null,
      },
    });
  },

  async atualizar(id: number, data: ClienteInput) {
    const cliente = await prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new Error("Cliente não encontrado.");

    return await prisma.cliente.update({
      where: { id },
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        observacao: data.observacoes,
      },
    });
  },

  async deletar(id: number, oficina_id?: number) {
    const where: any = { id };
    if (oficina_id) where.oficina_id = oficina_id;

    const cliente = await prisma.cliente.findFirst({ where });
    if (!cliente) throw new Error("Cliente não encontrado.");

    await prisma.cliente.delete({ where: { id } });
  },
};
