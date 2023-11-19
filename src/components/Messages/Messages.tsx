"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Messages.module.css";
import { useKeyboardAPI } from "@/hooks/useKeyboardAPI";

export default function Messages({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement | null>(null);

    const { rect } = useKeyboardAPI();

    useEffect(() => {
        if (ref.current) {
            if (rect) {
                ref.current.style.paddingBottom = `${
                    rect.height +
                    Number(ref.current.style.paddingBottom.replace("px", ""))
                }px`;
            }
        }
    }, [rect]);

    return (
        <div
            // onClick={() => handleGeometryChange()}
            ref={ref!}
            style={{ paddingBottom: 64 }}
            className={styles.messages}
        >
            {children}
        </div>
    );
}
