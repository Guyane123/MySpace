// Import the necessary functions and modules
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { vi, it, describe, expect } from "vitest";
import CheckSession from "../lib/CheckSession";

vi.mock("next-auth");
vi.mock("next/navigation");

describe("CheckSession", () => {
    it("should redirect to /login if there is no session", async () => {
        vi.mocked(getServerSession).mockResolvedValue({ name: "John Doe" });

        await CheckSession();

        const redirectMock = vi.mocked(redirect("/login"));

        expect(redirect).toHaveBeenCalledOnce();
    });
});
