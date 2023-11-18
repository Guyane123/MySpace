"use client";

import styles from "./Reset.module.css";
import { useEffect, useRef, useState } from "react";
import { hash } from "@/app/api/auth/[...nextauth]/actions";
import fetchUser from "@/app/api/fetchUser";
import useVisibility from "@/hooks/useVisibility";
import NOTPSVerify from "../../../lib/NOTPSVerify";
import useEmail from "@/hooks/useEmail";

export default function Reset() {
    const [email, setEmail] = useState("");
    const [formEmail, setformEmail] = useState(true);
    const [formCode, setformCode] = useState(false);
    const [formNewPassword, setFormNewPassword] = useState(false);

    const formCodeRef = useRef<HTMLDivElement | null>(null);
    return (
        <div className={styles.ResetForm}>
            <ResetFormEmail
                isVisible={formEmail}
                setNextForm={setformCode}
                setGlobalEmail={setEmail}
            />
            <ResetFormCode
                email={email}
                isVisible={formCode}
                setNextForm={setFormNewPassword}
            />
            <ResetPassword isVisible={formNewPassword} />
        </div>
    );
}

function ResetFormEmail({
    isVisible,
    setNextForm,
    setGlobalEmail,
}: {
    isVisible: boolean;
    setNextForm: React.Dispatch<React.SetStateAction<boolean>>;
    setGlobalEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
    const err = useRef<HTMLDivElement | null>(null);
    const emailInput = useRef<HTMLInputElement | null>(null);
    // const { email, setEmail } = useEmail(err.current!, "", emailInput.current!);
    const [email, setEmail] = useState("");
    // const { email, setEmail } = useEmail(err.current!, "", emailInput.current!);

    const { hide, visibility } = useVisibility(isVisible);

    const form1 = useRef<HTMLFormElement | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        async function checkIfUserExist() {
            const user = await fetchUser(email);

            const isUser = !!user;

            if (isUser) {
                setGlobalEmail(email);
                setNextForm(true);
                hide();
            }
        }

        checkIfUserExist();

        return null;
    }

    if (!visibility) {
        return null;
    }

    return (
        <form
            name="SignIn"
            ref={form1}
            className={styles.form}
            style={{ display: "visible", scale: 1 }}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className={styles.error} ref={err}></div>
            <input
                ref={emailInput}
                aria-invalid="false"
                className={styles.input}
                required
                type="email"
                id="email"
                placeholder="E-mail adress"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button className={`${styles.button} ${styles.signInButton}`}>
                Next
            </button>
        </form>
    );
}

function ResetFormCode({
    isVisible,
    setNextForm,
    email,
}: {
    isVisible: boolean;
    setNextForm: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
}) {
    const [code, setCode] = useState("");
    const { hide, visibility, show } = useVisibility(isVisible);

    const err = useRef<HTMLDivElement | null>(null);

    const emailInput = useRef<HTMLInputElement | null>(null);

    const form1 = useRef<HTMLFormElement | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        NOTPSVerify(code.toString(), email).then(function (res) {
            if (res) {
                setNextForm(true);
                hide();
            }
            console.log(res);
        });
    }

    useEffect(() => {
        if (email) {
            show();
        }
    }, [show, email]);

    if (!visibility) {
        return null;
    }

    return (
        <form
            name="SignIn"
            ref={form1}
            className={styles.form}
            style={{ display: isVisible ? "visible" : "hidden", scale: 1 }}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className={styles.error} ref={err}></div>
            <input
                ref={emailInput}
                aria-invalid="false"
                className={styles.input}
                required
                type="text"
                id="email"
                placeholder="Code"
                name="email"
                value={code}
                onChange={(e) => setCode((code) => e.target.value)}
            />

            <button
                type="submit"
                className={`${styles.button} ${styles.signInButton}`}
            >
                Next
            </button>
        </form>
    );
}

function ResetPassword({
    isVisible,
    setNextForm,
}: {
    isVisible: boolean;
    setNextForm?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        //logic

        return null;
    }

    const err = useRef<HTMLDivElement | null>(null);

    const emailInput = useRef<HTMLInputElement | null>(null);

    const form1 = useRef<HTMLFormElement | null>(null);
    const [password, setPassword] = useState("");
    const { hide, visibility, show } = useVisibility(isVisible);

    if (!visibility) {
        return null;
    }

    return (
        <form
            name="SignIn"
            ref={form1}
            className={styles.form}
            style={{ display: "visible", scale: 1 }}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className={styles.error} ref={err}></div>
            <input
                ref={emailInput}
                aria-invalid="false"
                className={styles.input}
                required
                type="email"
                id="email"
                placeholder="E-mail adress"
                name="email"
                value={password}
                onChange={(e) => setPassword((password) => e.target.value)}
            />

            <button className={`${styles.button} ${styles.signInButton}`}>
                Reset password
            </button>
        </form>
    );
}
