import axios from "axios";
import { getToken } from "./auth.js";

const OPERATE_AUDIENCE = "operate.camunda.io";

function getOperateBase() {
  const base = process.env.OPERATE_BASE_URL;
  if (!base) throw new Error("Missing OPERATE_BASE_URL");
  return base.replace(/\/+$/, "");
}

export type ProcessInstanceState = "ACTIVE" | "COMPLETED" | "CANCELED" | "TERMINATED";

export async function searchProcessInstances(params: {
  bpmnProcessId?: string;
  processInstanceKey?: string | number;
  state?: ProcessInstanceState | ProcessInstanceState[];
  limit?: number;
}) {
  const token = await getToken(OPERATE_AUDIENCE);
  const base = getOperateBase();

  const filter: Record<string, unknown> = {};
  if (params.bpmnProcessId) filter["bpmnProcessId"] = params.bpmnProcessId;
  if (params.processInstanceKey) filter["processInstanceKey"] = Number(params.processInstanceKey);
  if (params.state) filter["state"] = params.state;

  const body = {
    filter,
    size: params.limit ?? 20,
    sort: [{ field: "startDate", order: "DESC" }],
  };

  const resp = await axios.post(`${base}/v1/process-instances/search`, body, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

  return resp.data;
}

export async function getProcessInstance(processInstanceKey: string | number) {
  const token = await getToken(OPERATE_AUDIENCE);
  const base = getOperateBase();

  const resp = await axios.get(`${base}/v1/process-instances/${Number(processInstanceKey)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return resp.data;
}

export async function getFlowNodeInstances(processInstanceKey: string | number) {
  const token = await getToken(OPERATE_AUDIENCE);
  const base = getOperateBase();

  const body = {
    filter: { processInstanceKey: Number(processInstanceKey) },
    size: 200,
    sort: [{ field: "startDate", order: "ASC" }],
  };

  const resp = await axios.post(`${base}/v1/flow-node-instances/search`, body, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

  return resp.data;
}