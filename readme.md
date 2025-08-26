Camunda Demo (Node.js + TypeScript)

Summary
- Backend API to start and monitor Camunda 8 process instances (SaaS).
- Uses Zeebe client to start instances and Operate Read API to query instances and flow nodes.
- Prepared for adding Zeebe workers (system tasks) later.

Monorepo layout
- Root workspaces: backend (API) and frontend (UI placeholder).

Structure
- backend/src
	- index.ts: Express app bootstrap, mounts routes and health endpoint.
	- routes/process.routes.ts: REST endpoints under /api.
	- controllers/process.controller.ts: Handlers to start/search/get process instances and flow nodes.
	- clients/camunda/auth.ts: OAuth token acquisition (SaaS, audience-based).
	- clients/camunda/zeebe.ts: Zeebe client factory for Camunda Cloud.
	- clients/camunda/operate.ts: Operate Read API client.
	- middleware/error.ts: Central error handler.
	- config/env.ts: Validates required environment variables at startup.

Prereqs
- Node 18+ (recommended Node 20+).
- Camunda 8 SaaS cluster and credentials.

Environment
Create backend/.env (do NOT commit):

```
C8_CLIENT_ID=...
C8_CLIENT_SECRET=...
C8_REGION=bru-2
C8_CLUSTER_ID=...
OPERATE_BASE_URL=https://<clusterId>.operate.camunda.io
PORT=3000
```

Install and run (Windows PowerShell)
```
cd C:\Projects\Camunda_Demo
npm install
npm run dev:api
```

Quick test
```
# Health
curl.exe http://localhost:3000/health

# Start process instance
$body = @{ bpmnProcessId = "Process_0dwpplo"; variables = @{ } } | ConvertTo-Json
irm -Method Post http://localhost:3000/api/process-instances -Headers @{ "Content-Type"="application/json" } -Body $body

# Replace with returned processInstanceKey
$k = 2251799813685249
curl.exe "http://localhost:3000/api/process-instances/$k"
curl.exe "http://localhost:3000/api/process-instances/$k/flow-nodes"
```

Notes
- Manual Tasks complete immediately; track them in flow nodes via Operate.
- Secrets in backend/.env are git-ignored.
- Future: add Zeebe workers under backend/src/workers.
