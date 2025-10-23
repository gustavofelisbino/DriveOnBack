import { Router } from "express";
import clientesRouter from "./clientes.routes";
import funcionariosRouter from "./funcionarios.routes";
import oficinasRouter from "./oficinas.routes";
import veiculosRouter from "./veiculos.routes";
import fornecedoresRouter from "./fornecedores.routes";
import estoqueRouter from "./estoque.routes";
import authRouter from "./auth.routes";
import usuarioRouter from "./usuario.routes";
import cidadeRouter from "./cidade.routes";
import servicosRouter from "./servicos.routes";
import ordensRouter from "./ordens.routes"
import pecasRouter from "./pecas.routes"

export const router = Router();

router.use("/clientes", clientesRouter);
router.use("/funcionarios", funcionariosRouter);
router.use("/oficinas", oficinasRouter);
router.use("/veiculos", veiculosRouter);
router.use("/fornecedores", fornecedoresRouter);
router.use("/estoque", estoqueRouter);
router.use("/auth", authRouter);
router.use("/usuario", usuarioRouter);
router.use("/cidade", cidadeRouter);
router.use("/servicos", servicosRouter);
router.use("/ordens", ordensRouter);
router.use("/pecas", pecasRouter);

export default router;