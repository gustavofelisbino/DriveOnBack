import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: "E-mail não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const usuarioPayload = {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo,
      oficinaId: usuario.oficina_id,
    };

    const token = jwt.sign(usuarioPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.json({ token, usuario: usuarioPayload });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro interno ao autenticar." });
  }
}
