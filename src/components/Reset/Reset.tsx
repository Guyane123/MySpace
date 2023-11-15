"use client";

import styles from "./Reset.module.css";
import Image from "next/image";
import GithubIcon from "@/../public/github-mark.svg";
import GoogleIcon from "@/../public/Google.svg";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import { redirect } from "next/navigation";
import { hash } from "@/app/api/auth/[...nextauth]/actions";
import fetchUser from "@/app/api/fetchUser";

export default function Reset() {
    const [email, setEmail] = useState("");

    const err = useRef<HTMLDivElement | null>(null);

    const emailInput = useRef<HTMLInputElement | null>(null);

    const form1 = useRef<HTMLFormElement | null>(null);
    const form2 = useRef<HTMLFormElement | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = {
            email: formData.get("email"),
        };

        if (!err.current) {
            return "err";
        }

        if (err.current.innerHTML) {
            err.current.innerHTML = "";
        }

        if (!user.email) {
            err.current.innerHTML += "Please provide an e-mail. <br />";

            emailInput.current!.ariaInvalid = "true";
        }

        if (err.current.innerHTML) {
            return null;
        }

        async function checkIfUserExist() {
            const user = await fetchUser(email);

            const isUser = !!user;

            // if (isUser) {
            //     if( form1.current)
            //     form1.current?.style.visibility = "hidden"
            // }
        }

        checkIfUserExist();

        emailInput.current!.ariaInvalid = "false";

        err.current.innerHTML = "";

        return null;
    }

    return (
        <div className={styles.signInForm}>
            <div className={styles.title}>
                Enter your email to reset your password
            </div>
            <div className={styles.error} ref={err}></div>

            <form
                name="SignIn"
                ref={form1}
                className={styles.form}
                style={{ display: "visible", scale: 1 }}
                onSubmit={(e) => handleSubmit(e)}
            >
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
                    onChange={(e) => setEmail((email) => e.target.value)}
                />

                <button className={`${styles.button} ${styles.signInButton}`}>
                    Next
                </button>
            </form>
            <form
                name="SignIn"
                ref={form2}
                className={styles.form}
                style={{ display: "hidden", scale: 0 }}
                onSubmit={(e) => handleSubmit(e)}
            >
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
                    onChange={(e) => setEmail((email) => e.target.value)}
                />

                <button className={`${styles.button} ${styles.signInButton}`}>
                    Next
                </button>
            </form>
            <p className={styles.separator}>
                <span>
                    <Link href="/login" className={styles.a}>
                        Cancel
                    </Link>
                </span>
            </p>
        </div>
    );
}
