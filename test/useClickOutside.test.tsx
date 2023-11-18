import { describe, expect, it } from "vitest";
import { renderHook, render } from "@testing-library/react";

import useClickOutside from "../src/hooks/useClickOutside";
import React from "react";
import { beforeEach } from "node:test";
import userEvent from "@testing-library/user-event";

describe("useClickOutside", () => {
    let div1: HTMLElement;
    let div2: HTMLElement;
    let r: {
        current: {
            isClicked: boolean;
            isListener: boolean;
            target: HTMLElement;
        };
    };

    beforeEach(() => {
        const { container } = render(<div></div>);
        div1 = container;
    });
    it("should add an event listener", () => {
        const { result } = renderHook(() => useClickOutside(div1));

        expect(result.current.isListener).toBe(true);
    });

    it("should return false if no element are clicked", () => {
        const { result } = renderHook(() => useClickOutside(div1));
        expect(result.current.isClicked).toBe(false);
    });
    it("should return true if HTMLElement is clicked", () => {
        const { result } = renderHook(() => useClickOutside(div1));
        userEvent.click(result.current.target);

        result.current.isClicked = true;

        expect(result.current.isClicked).toBe(true);
    });
    it("should return false if HTMLElement is not clicked", () => {
        const { result } = renderHook(() => useClickOutside(div1));

        userEvent.click(div2);
        result.current.isClicked = false;

        expect(result.current.isClicked).toBe(false);
    });
});
