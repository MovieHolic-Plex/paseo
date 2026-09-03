import { describe, expect, test } from "vitest";

import { createTestLogger } from "../../../../test-utils/test-logger.js";
import { PiRpcAgentClient } from "./agent.js";
import { OMO_PROVIDER_IDENTITY, PI_PROVIDER_IDENTITY } from "./provider-identity.js";

describe("Pi-compatible provider identity", () => {
  test("omo and pi identities differ in binary and config dir", () => {
    expect(PI_PROVIDER_IDENTITY.defaultBinary).toBe("pi");
    expect(PI_PROVIDER_IDENTITY.configDirName).toBe(".pi");
    expect(OMO_PROVIDER_IDENTITY.defaultBinary).toBe("omo");
    expect(OMO_PROVIDER_IDENTITY.configDirName).toBe(".omo");
  });

  test("a client built with the omo identity reports omo as its provider", () => {
    const client = new PiRpcAgentClient({
      logger: createTestLogger(),
      identity: OMO_PROVIDER_IDENTITY,
    });
    expect(client.provider).toBe("omo");
  });

  test("a client without an identity still behaves as pi", () => {
    const client = new PiRpcAgentClient({ logger: createTestLogger() });
    expect(client.provider).toBe("pi");
  });

  test("diagnostics report the omo binary and omo auth config, not pi's", async () => {
    const omoClient = new PiRpcAgentClient({
      logger: createTestLogger(),
      identity: OMO_PROVIDER_IDENTITY,
    });
    const { diagnostic } = await omoClient.getDiagnostic();

    expect(diagnostic).toContain("~/.omo/agent/auth.json");
    expect(diagnostic).not.toContain("~/.pi/agent/auth.json");
    expect(diagnostic).toContain("Binary: omo");
  });

  test("pi diagnostics keep reporting the pi binary and pi auth config", async () => {
    const piClient = new PiRpcAgentClient({ logger: createTestLogger() });
    const { diagnostic } = await piClient.getDiagnostic();

    expect(diagnostic).toContain("~/.pi/agent/auth.json");
    expect(diagnostic).toContain("Binary: pi");
  });
});
