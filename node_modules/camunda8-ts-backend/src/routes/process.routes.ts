import { Router } from "express";
import {
	getInstance,
	getInstanceFlowNodes,
	searchInstances,
	startInstance,
} from "../controllers/process.controller.js";

const router = Router();

router.post("/process-instances", startInstance);
router.get("/process-instances", searchInstances);
router.get("/process-instances/:key", getInstance);
router.get("/process-instances/:key/flow-nodes", getInstanceFlowNodes);

export default router;
