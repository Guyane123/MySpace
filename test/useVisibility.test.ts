import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useVisibility from "../src/hooks/useVisibility";
import { act } from "react-dom/test-utils";

describe("useVisibility", () => {
    it("should use default visibility", () => {
        const { result } = renderHook(() => useVisibility(false));

        expect(result.current.visibility).toBe(false);
    });

    it("should toggle visibility", () => {
        const { result } = renderHook(() => useVisibility(false));

        act(() => result.current.toggle());

        expect(result.current.visibility).toBe(true);
    });

    it("should set visibility to true", () => {
        const { result } = renderHook(() => useVisibility(false));

        act(() => result.current.show());

        expect(result.current.visibility).toBe(true);
    });
    it("should set visibility to false", () => {
        const { result } = renderHook(() => useVisibility(true));

        act(() => result.current.hide());

        expect(result.current.visibility).toBe(false);
    });
});
