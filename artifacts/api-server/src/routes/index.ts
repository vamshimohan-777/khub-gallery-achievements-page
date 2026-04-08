import { Router, type IRouter } from "express";
import healthRouter from "./health";
import paradigmsRouter from "./paradigms";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/paradigms", paradigmsRouter);

export default router;
