import { useEffect, useState } from "react";

export default function useEmail(
    err: HTMLElement,
    currentEmail: string,
    emailInput: HTMLInputElement
) {
    const [email, setEmail] = useState(currentEmail);
    useEffect(() => {
        if (err) {
            err.innerHTML = "";
        }

        if (!email) {
            err.innerHTML += "Please provide an e-mail. <br />";

            emailInput.ariaInvalid = "true";
        }
    });

    return {
        email: email,
        setEmail: (email: string) => {
            setEmail(email);
            return email;
        },
    };
}
