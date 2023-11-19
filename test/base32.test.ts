import { describe, expect, it } from "vitest";
import { base32 } from "../lib/encodeToBase32";

describe("base32", () => {
    describe("#encode", () => {
        it("should be a function", () => {
            expect(base32.encode).a("function");
        });
        it("should convert string to base32", () => {
            const string = base32.encode("Hello world !");
            const expectedString = "JBSWY3DPEB3W64TMMQQCC";

            expect(string).toBe(expectedString);
        });
    });
});
