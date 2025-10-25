import { Router } from "express";
import { clienteController } from "../controllers/clientes.controller";
import { authMiddleware } from "../middlewares/ensureAuth";

const router = Router();

router.use(authMiddleware);

router.get("/", clienteController.listar);
router.post("/", clienteController.criar);
router.put("/:id", clienteController.atualizar);
router.delete("/:id", clienteController.deletar);
router.get("/:id", clienteController.getDetalhes);

export default router;
