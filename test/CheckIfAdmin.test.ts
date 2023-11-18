import { describe, expect, it } from "vitest";
import CheckIfAdmin from "../lib/CheckIfAdmin";

describe("CheckSession", () => {
    it.skip("should return false is no session", async () => {
        const isAdmin = await CheckIfAdmin();

        expect(isAdmin).toBe(false);
    });
    it.skip("should return true if session", async () => {
        const isAdmin = await CheckIfAdmin();

        expect(isAdmin).toBe(true);
    });
});
