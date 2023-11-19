import { describe, expect, it } from "vitest";

import { encrypt } from "../lib/encrypt";

describe("hash", () => {
    it("should hash string", async () => {
        process.env.ENCRYPTION_KEY = "Hello world !";

        const hashedString = await encrypt.hash("Hello world !");
        const expectedString =
            "84eb68c06bcb61a0f090e50d7c70c060493734346c0aa05a686c7afec51aab2b";

        expect(hashedString).toBe(expectedString);
    });
});
