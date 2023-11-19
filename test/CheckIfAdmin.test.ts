// Import the necessary functions and modules
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import fetchCurrentUser from "../src/app/api/fetchCurrentUser";
import { vi, it, describe, expect } from "vitest";
import CheckIfAdmin from "../lib/CheckIfAdmin";
import { UserType } from "@/app/types";

vi.mock("../src/app/api/fetchCurrentUser");

describe("CheckIfAdmin", () => {
    it("should fetch current User", async () => {
        await CheckIfAdmin();

        expect(fetchCurrentUser).toHaveBeenCalledOnce();
    });
    it("should return true if user is an ADMIN", async () => {
        vi.mocked(fetchCurrentUser).mockResolvedValue({
            role: "ADMIN",
            email: "JohnDoe@gmail.com",
        } as any);

        const isAdmin = await CheckIfAdmin();

        expect(isAdmin).toBe(true);
    });
    it("should return true if user is an OWNER", async () => {
        vi.mocked(fetchCurrentUser).mockResolvedValue({
            role: "OWNER",
            email: "JohnDoe@gmail.com",
        } as any);

        const isAdmin = await CheckIfAdmin();

        expect(isAdmin).toBe(true);
    });
    it("should return false if user is an USER", async () => {
        vi.mocked(fetchCurrentUser).mockResolvedValue({
            role: "USER",
            email: "JohnDoe@gmail.com",
        } as any);

        const isAdmin = await CheckIfAdmin();

        expect(isAdmin).toBe(false);
    });
});
