import { useEffect, useState } from "react";

export function useKeyboardAPI() {
    const [rect, setRect] = useState<DOMRect>();
    const [event, setEvent] = useState<DOMRect>();

    function handleGeometryChange() {
        const vk = navigator.virtualKeyboard;
        const boundingRect = vk.boundingRect;

        if (boundingRect) {
            setRect(boundingRect);
        }
    }

    useEffect(() => {
        if (!("virtualKeyboard" in navigator)) {
            return;
        }

        const vk = navigator.virtualKeyboard;

        const event = (vk.ongeometrychange = () => handleGeometryChange());

        // return (() => {
        //     event
        // })
    }, []);

    return {
        rect: rect,
        // event:
    };
}
