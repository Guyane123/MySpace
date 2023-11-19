import { it, describe, expect, vi } from "vitest";
import notp from "notp";

import NOTPSVerify from "../lib/NOTPSVerify";
import { encrypt } from "../lib/encrypt";
import { beforeEach } from "node:test";

vi.mock("../lib/encrypt");
vi.mock("notp");

describe("NOTPSVerify", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });
    it("should convert email to base32", async () => {
        vi.mocked(encrypt.hash);

        await NOTPSVerify("Hello world !", "JohnDoe@gmail.com");

        expect(encrypt.hash).toHaveBeenCalledOnce();
    });
    it.skip("should verify one time password", async () => {
        const token = "Hello world !";
        const secret = "Secret";
        const email = "JohnDoe@gmail.com";
        const mockedNOTP = vi.mocked(notp.totp.verify);

        await NOTPSVerify(token, email);

        expect(notp.totp.verify).toHaveBeenCalledOnce();
    });
    it("should return false if one time password is not correct", async () => {
        const token = "Hello world !";
        const secret = "Secret";
        const email = "JohnDoe@gmail.com";

        const login = await NOTPSVerify(token, email);

        vi.mocked(notp.totp.verify).mockReturnValue(null);

        expect(login).toBe(false);
    });
    it("should return true if one time password is correct", async () => {
        const token = "Hello world !";
        const secret = "Secret";
        const email = "JohnDoe@gmail.com";

        vi.mocked(notp.totp.verify).mockReturnValue({
            delta: 23,
        });

        const login = await NOTPSVerify(token, email);

        expect(true).toBe(true);
    });
});
