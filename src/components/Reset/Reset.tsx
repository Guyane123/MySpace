"use client";

import styles from "./Reset.module.css";
import { useEffect, useRef, useState } from "react";
import fetchUser from "@/app/api/fetchUser";
import useVisibility from "@/hooks/useVisibility";
import NOTPSVerify from "../../../lib/NOTPSVerify";
import useEmail from "@/hooks/useEmail";
import { updatePassword } from "@/app/api/updatePassword";
import { useRouter } from "next/navigation";

export default function Reset() {
    const [email, setEmail] = useState("");
    const [formEmail, setformEmail] = useState(true);
    const [formCode, setformCode] = useState(false);
    const [code, setCode] = useState<string>("");
    const [formNewPassword, setFormNewPassword] = useState(false);
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    const formCodeRef = useRef<HTMLDivElement | null>(null);
    return (
        <div className={styles.ResetForm}>
            {/* <ResetFormEmail
                isVisible={formEmail}
                setNextForm={setformCode}
                setGlobalEmail={setEmail}
            /> */}

            <ResetForm
                type="email"
                name="email"
                setCurrentForm={setformEmail}
                isVisible={formEmail}
                setEmail={setEmail}
                email={email}
                placeholder="Email"
                setNextForm={setformCode}
                nextForm={async () => {
                    const user = await fetchUser(email);

                    if (!!user) {
                        return true;
                    }

                    return false;
                }}
            />
            <ResetForm
                type="text"
                name="code"
                setCurrentForm={setformCode}
                isVisible={formCode}
                placeholder="Time based one time password"
                setNextForm={setFormNewPassword}
                setCode={setCode}
                code={code}
                nextForm={async () => {
                    if (formEmail == false && email) {
                        const res = await NOTPSVerify(code.toString(), email);

                        if (res) {
                            return true;
                        }
                    }
                    return false;
                }}
            />
            <ResetForm
                type="password"
                name="password"
                setCurrentForm={setFormNewPassword}
                isVisible={formNewPassword}
                placeholder="New password"
                password={password}
                setPassword={setPassword}
                nextForm={async () => {
                    const updatedUser = await updatePassword(password, email);

                    // console.log(password);
                    // console.log(email);
                    // console.log(updatePassword);

                    if (updatedUser) {
                        router.replace("/login");
                    }

                    return false;
                }}
            />
        </div>
    );
}

function ResetForm({
    isVisible,
    name,
    placeholder,
    setNextForm,
    type,
    email,
    setEmail,
    code,
    setCode,
    nextForm,
    setCurrentForm,
    setPassword,
    password,
}: {
    isVisible: boolean;
    name: string;
    placeholder: string;
    setNextForm?: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentForm: React.Dispatch<React.SetStateAction<boolean>>;
    type: "text" | "email" | "password";
    setEmail?: React.Dispatch<React.SetStateAction<string>>;
    email?: string;
    setCode?: React.Dispatch<React.SetStateAction<string>>;
    code?: string;
    setPassword?: React.Dispatch<React.SetStateAction<string>>;
    password?: string;
    nextForm: () => Promise<boolean>;
}) {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        nextForm().then((res) => {
            if (res) {
                setCurrentForm(false);
                if (setNextForm) {
                    setNextForm(true);
                }
                hide();
            }
        });

        if (setCode) {
            setCode(state);
        }

        if (setEmail) {
            setEmail(state);
        }

        if (setPassword) {
            setPassword(state);
        }
        return null;
    }

    const err = useRef<HTMLDivElement | null>(null);

    const input = useRef<HTMLInputElement | null>(null);

    const form = useRef<HTMLFormElement | null>(null);
    const [state, setState] = useState<string>("");
    const { hide, visibility, show } = useVisibility(isVisible);

    useEffect(() => {
        if (isVisible) {
            show();
        }
    }, [isVisible, show]);

    if (!visibility) {
        return null;
    }

    return (
        <form
            name={name}
            ref={form}
            className={styles.form}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className={styles.error} ref={err}></div>
            <input
                ref={input}
                aria-invalid="false"
                className={styles.input}
                required
                type={type}
                id={name}
                placeholder={placeholder}
                name={name + "input"}
                value={state}
                onChange={(e) => setState((state) => e.target.value)}
            />

            <button className={`${styles.button} ${styles.signInButton}`}>
                Reset password
            </button>
        </form>
    );
}

