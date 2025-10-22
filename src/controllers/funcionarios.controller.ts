import { Request, Response } from "express";
import { FuncionariosService } from "../services/funcionarios.service";

export const FuncionariosController = {
  async list(req: Request, res: Response) {
    res.json(await FuncionariosService.list());
  },

  async getById(req: Request, res: Response) {
    res.json(await FuncionariosService.getById(Number(req.params.id)));
  },

  async create(req: Request, res: Response) {
    res.status(201).json(await FuncionariosService.create(req.body));
  },

  async update(req: Request, res: Response) {
    res.json(await FuncionariosService.update(Number(req.params.id), req.body));
  },

  async remove(req: Request, res: Response) {
    await FuncionariosService.remove(Number(req.params.id));
    res.status(204).send();
  },
};
