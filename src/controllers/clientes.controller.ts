import { Request, Response } from "express";
import { ClienteService } from "../services/clientes.service";

const service = new ClienteService();

export const clienteController = {
  async listar(req: Request, res: Response) {
    const { oficinaId } = req.user;
    const clientes = await service.listar(oficinaId);
    res.json(clientes);
  },

  async criar(req: Request, res: Response) {
    const { nome, email, telefone, observacoes } = req.body;
    const { oficinaId } = req.user;

    try {
      const cliente = await service.criar({ nome, email, telefone, observacoes, oficinaId });
      res.status(201).json(cliente);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, email, telefone, observacoes } = req.body;
    const { oficinaId } = req.user;

    try {
      const cliente = await service.atualizar(Number(id), { nome, email, telefone, observacoes, oficinaId });
      res.json(cliente);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },

  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    const { oficinaId } = req.user;

    try {
      await service.deletar(Number(id), oficinaId);
      res.status(204).send();
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },
};
