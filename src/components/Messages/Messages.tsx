"use client";

import { ExtendedNavigator, virtualKeyboard } from "@/app/types";
import React, { useEffect, useRef } from "react";
import styles from "./Messages.module.css";

export default function Messages({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!("virtualKeyboard" in navigator)) {
            return;
        }

        const ExtendedNavigator: ExtendedNavigator =
            navigator as ExtendedNavigator;
        const vk = ExtendedNavigator.virtualKeyboard;

        vk.ongeometrychange = function change(e) {
            if (e.target) {
                const el = e.target as unknown as virtualKeyboard;

                if (ref.current) {
                    ref.current.style.paddingBottom = `${
                        el.boundingRect.height +
                        Number(
                            ref.current.style.paddingBottom.replace("px", "")
                        )
                    }px`;
                }
            }
        };
    }, []);

    return (
        <div
            ref={ref!}
            style={{ paddingBottom: 64 }}
            className={styles.messages}
        >
            {children}
        </div>
    );
}
