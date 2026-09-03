import { describe, expect, test } from "vitest";

import { createTestLogger } from "../../test-utils/test-logger.js";
import { buildProviderRegistry, createAllClients } from "./provider-registry.js";

const PREVIOUSLY_SHIPPED_BUILTINS = ["claude", "codex", "copilot", "opencode", "pi", "omp"];

describe("omo built-in provider client", () => {
  test("registers omo in the provider registry", () => {
    const registry = buildProviderRegistry(createTestLogger());
    expect(Object.keys(registry)).toContain("omo");
  });

  test("creates a client whose provider identity is omo", () => {
    const clients = createAllClients(createTestLogger());
    expect(clients.omo?.provider).toBe("omo");
  });

  test("keeps every previously shipped built-in provider resolving to itself", () => {
    const clients = createAllClients(createTestLogger());
    for (const provider of PREVIOUSLY_SHIPPED_BUILTINS) {
      expect(clients[provider]?.provider).toBe(provider);
    }
  });
});
