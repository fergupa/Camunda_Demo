export type Env = {
	C8_CLIENT_ID: string;
	C8_CLIENT_SECRET: string;
	C8_REGION: string;
	C8_CLUSTER_ID: string;
	OPERATE_BASE_URL: string;
	PORT?: string;
};

export function getEnv(): Env {
	const {
		C8_CLIENT_ID,
		C8_CLIENT_SECRET,
		C8_REGION,
		C8_CLUSTER_ID,
		OPERATE_BASE_URL,
		PORT,
	} = process.env as NodeJS.ProcessEnv & Env;

	const missing = [
		["C8_CLIENT_ID", C8_CLIENT_ID],
		["C8_CLIENT_SECRET", C8_CLIENT_SECRET],
		["C8_REGION", C8_REGION],
		["C8_CLUSTER_ID", C8_CLUSTER_ID],
		["OPERATE_BASE_URL", OPERATE_BASE_URL],
	].filter(([, v]) => !v);

	if (missing.length) {
		const names = missing.map(([k]) => k).join(", ");
		throw new Error(`Missing required env vars: ${names}`);
	}

	return {
		C8_CLIENT_ID: C8_CLIENT_ID!,
		C8_CLIENT_SECRET: C8_CLIENT_SECRET!,
		C8_REGION: C8_REGION!,
		C8_CLUSTER_ID: C8_CLUSTER_ID!,
		OPERATE_BASE_URL: OPERATE_BASE_URL!,
		PORT,
	};
}