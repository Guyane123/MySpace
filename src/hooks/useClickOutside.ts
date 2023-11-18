import { useEffect, useState } from "react";

export default function useClickOutside(target: HTMLElement) {
    const [isClicked, setIsClicked] = useState(false);
    const [isListener, setIsListener] = useState(false);

    useEffect(() => {
        const checkIfClicked = (event: any) => {
            if (!target?.contains(event.target)) {
                setIsClicked(false);
            } else {
                setIsClicked(true);
            }
        };

        window.addEventListener("mousedown", checkIfClicked);

        setIsListener(true);

        return () => {
            window.removeEventListener("mousedown", checkIfClicked);
            setIsListener(false);
        };
    }, [target]);

    return {
        isClicked: isClicked,
        isListener: isListener,
        target: target,
    };
}
