import { describe, expect, it } from "vitest";

import { buildProviderCommand } from "@/utils/provider-command-templates";
import { getProviderIcon } from "./provider-icons";
import { resolveProviderIconName } from "./provider-icon-name";

describe("omo client integration", () => {
  it("resolves omo to a built-in icon instead of the generic fallback", () => {
    expect(resolveProviderIconName("omo")).toEqual({ kind: "builtin", id: "omo" });
  });

  it("renders a dedicated omo icon component", () => {
    const omoIcon = getProviderIcon("omo");
    const unknownIcon = getProviderIcon("definitely-not-a-provider");
    expect(omoIcon).toBeDefined();
    expect(omoIcon).not.toBe(unknownIcon);
  });

  it("keeps omp resolving to its own distinct icon", () => {
    expect(getProviderIcon("omo")).not.toBe(getProviderIcon("omp"));
  });

  it("builds an omo resume command from a provider session id", () => {
    expect(buildProviderCommand({ provider: "omo", id: "resume", sessionId: "abc123" })).toBe(
      "omo --session abc123",
    );
  });
});
