import { Request, Response } from "express";
import { getZeebeClient } from "../clients/camunda/zeebe.js";
import {
	getFlowNodeInstances,
	getProcessInstance,
	searchProcessInstances,
} from "../clients/camunda/operate.js";

export async function startInstance(req: Request, res: Response) {
	try {
		const { bpmnProcessId, variables, version } = req.body ?? {};
		if (!bpmnProcessId) return res.status(400).json({ error: "bpmnProcessId is required" });

		const zbc = getZeebeClient();
		const result = await zbc.createProcessInstance({
			bpmnProcessId,
			version: typeof version === "number" ? version : -1, // -1 = latest
			variables: variables ?? {},
		});

		return res.status(201).json({
			processInstanceKey: result.processInstanceKey,
			bpmnProcessId,
			version: result.version,
		});
	} catch (err: any) {
		console.error("Create instance error:", err?.message || err);
		return res.status(500).json({ error: "Failed to start process instance" });
	}
}

export async function searchInstances(req: Request, res: Response) {
	try {
		const { bpmnProcessId, state, limit } = req.query as Record<string, string | undefined>;

		const data = await searchProcessInstances({
			bpmnProcessId: bpmnProcessId || undefined,
			state: state ? (state.includes(",") ? (state.split(",") as any) : (state as any)) : undefined,
			limit: limit ? Number(limit) : undefined,
		});

		return res.json(data);
	} catch (err: any) {
		console.error("Search instances error:", err?.message || err);
		return res.status(500).json({ error: "Failed to search process instances" });
	}
}

export async function getInstance(req: Request, res: Response) {
	try {
		const data = await getProcessInstance(req.params.key);
		return res.json(data);
	} catch (err: any) {
		console.error("Get instance error:", err?.message || err);
		return res.status(500).json({ error: "Failed to fetch instance" });
	}
}

export async function getInstanceFlowNodes(req: Request, res: Response) {
	try {
		const data = await getFlowNodeInstances(req.params.key);
		return res.json(data);
	} catch (err: any) {
		console.error("Get flow-nodes error:", err?.message || err);
		return res.status(500).json({ error: "Failed to fetch flow-nodes" });
	}
}
