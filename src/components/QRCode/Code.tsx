"use client";

import { useEffect, useState } from "react";
import styles from "./QRCode.module.css";
import notp from "notp";

export default function Code({
    code,
    className,
}: {
    code: string;
    className?: string;
}) {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    return (
        <div
            className={styles.div}
            onClick={() => {
                navigator.clipboard.writeText(code);
                setIsCopied(true);
            }}
        >
            <p className={styles.a}>{code}</p>
            {isCopied ? "Copied" : "Copy"}
        </div>
    );
}
