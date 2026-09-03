import { describe, expect, it } from "vitest";

import { ProviderOverridesSchema } from "./provider-config.js";
import { BUILTIN_PROVIDER_ICON_NAMES } from "./provider-icon-names.js";
import {
  AGENT_PROVIDER_DEFINITIONS,
  BUILTIN_PROVIDER_IDS,
  getAgentProviderDefinition,
  isValidAgentProvider,
} from "./provider-manifest.js";

describe("omo built-in provider registration", () => {
  it("ships omo as a built-in provider id", () => {
    expect(BUILTIN_PROVIDER_IDS).toContain("omo");
    expect(isValidAgentProvider("omo")).toBe(true);
  });

  it("declares an omo definition with a label and description", () => {
    const definition = getAgentProviderDefinition("omo");
    expect(definition.id).toBe("omo");
    expect(definition.label.length).toBeGreaterThan(0);
    expect(definition.description.length).toBeGreaterThan(0);
  });

  it("keeps every previously shipped built-in provider registered", () => {
    for (const provider of ["claude", "codex", "copilot", "opencode", "pi", "omp"]) {
      expect(BUILTIN_PROVIDER_IDS).toContain(provider);
    }
    expect(new Set(AGENT_PROVIDER_DEFINITIONS.map((entry) => entry.id)).size).toBe(
      AGENT_PROVIDER_DEFINITIONS.length,
    );
  });

  it("accepts an omo provider override without requiring extends or label", () => {
    const result = ProviderOverridesSchema.safeParse({ omo: { enabled: true } });
    expect(result.success).toBe(true);
  });

  it("exposes an omo provider icon name so the client renders a real icon", () => {
    expect(BUILTIN_PROVIDER_ICON_NAMES).toContain("omo");
  });
});
