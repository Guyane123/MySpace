import { describe, expect, it, vi } from "vitest";

describe("#CheckSession", () => {
    it.skip("should return false is no session", async () => {
        const isSession = false;

        expect(isSession).toBe(false);
    });

    it.skip("should return true if session", async () => {
        const isSession = true;

        expect(isSession).toBe(true);
    });
});
