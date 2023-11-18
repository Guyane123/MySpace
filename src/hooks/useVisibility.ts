import { useState } from "react";

export default function useVisibility(defaultValue: boolean) {
    const [show, setShow] = useState(defaultValue);

    return {
        toggle: function () {
            setShow((show) => !show);

            return show;
        },

        visibility: show,

        show: () => {
            setShow(true);
            return true;
        },
        hide: () => {
            setShow(false);
            return false;
        },
    };
}
