import type { AgentProvider } from "@getpaseo/protocol/agent-types";

/**
 * Identity of a Pi-RPC-compatible provider.
 *
 * Pi's RPC surface is also spoken by sibling agents (omo/senpi), so the client
 * implementation is shared and only these values differ between them.
 */
export interface PiCompatibleProviderIdentity {
  /** Paseo provider id, e.g. "pi" or "omo". */
  readonly provider: AgentProvider;
  /** Human-readable name used in permission prompts and diagnostics. */
  readonly label: string;
  /** Binary launched when the user has not configured a replacement command. */
  readonly defaultBinary: string;
  /** Home-relative config directory holding `agent/`, e.g. ".pi" or ".omo". */
  readonly configDirName: string;
  /** Env var overriding the agent directory, e.g. PI_CODING_AGENT_DIR. */
  readonly agentDirEnv: string;
  /** Env var overriding the sessions directory, e.g. PI_CODING_AGENT_SESSION_DIR. */
  readonly sessionDirEnv: string;
}

function resolveBinary(envValue: string | undefined, fallback: string): string {
  const trimmed = envValue?.trim();
  return trimmed ? trimmed : fallback;
}

export const PI_PROVIDER_IDENTITY: PiCompatibleProviderIdentity = {
  provider: "pi",
  label: "Pi",
  defaultBinary: resolveBinary(process.env.PI_COMMAND ?? process.env.PI_ACP_PI_COMMAND, "pi"),
  configDirName: ".pi",
  agentDirEnv: "PI_CODING_AGENT_DIR",
  sessionDirEnv: "PI_CODING_AGENT_SESSION_DIR",
};

export const OMO_PROVIDER_IDENTITY: PiCompatibleProviderIdentity = {
  provider: "omo",
  label: "Omo",
  defaultBinary: resolveBinary(process.env.OMO_COMMAND, "omo"),
  configDirName: ".omo",
  // Namespaced so a pi user's PI_CODING_AGENT_DIR cannot redirect omo's sessions.
  agentDirEnv: "OMO_CODING_AGENT_DIR",
  sessionDirEnv: "OMO_CODING_AGENT_SESSION_DIR",
};
