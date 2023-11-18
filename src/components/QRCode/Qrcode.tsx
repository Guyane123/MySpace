"use client";

import { toCanvas } from "qrcode";
import { useEffect, useRef } from "react";
export default function QRCodeComponent({
    data,
    className,
}: {
    data: string;
    className?: string;
}) {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        toCanvas(canvas.current, data, (error) => console.log(error));
    }, []);

    return <canvas ref={canvas} className={className}></canvas>;
}
