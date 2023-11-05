"use client";

import styles from "./Login.module.css";
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

export default function SignInForm() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const err = useRef<HTMLDivElement | null>(null);

    const emailInput = useRef<HTMLInputElement | null>(null);
    const passwordInput = useRef<HTMLInputElement | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = {
            email: formData.get("email"),
            password: formData.get("password"),
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
        if (!user.password) {
            err.current.innerHTML += "Please provide a password. <br />";

            passwordInput.current!.ariaInvalid = "true";
        }

        if (err.current.innerHTML) {
            return null;
        }

        async function checkIfUserExist() {
            const user = await fetchUser(email);

            const isUser = !!user;

            if (isUser) {
                signIn("credentials", {
                    email: email,
                    password: await hash(password),
                    redirect: true,
                    callbackUrl: "/",
                });
            } else {
                console.log(email, password);
                err.current!.innerHTML += "Invalid credentials. <br />";
            }
            return !!user;
        }

        checkIfUserExist();

        passwordInput.current!.ariaInvalid = "false";
        emailInput.current!.ariaInvalid = "false";

        err.current.innerHTML = "";

        return null;
    }

    return (
        <div className={styles.signInForm}>
            <div className={styles.title}>Sign in to PinkBerries</div>
            <div className={styles.error} ref={err}></div>
            <ul className={styles.ul}>
                <li>
                    <button
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            signIn("google", {
                                redirect: true,
                            });
                        }}
                    >
                        <p>
                            <span className={styles.logo}>
                                <Image
                                    src={GoogleIcon}
                                    alt="Google icon"
                                    width={18}
                                    height={18}
                                    className={styles.img}
                                />{" "}
                            </span>
                            Continue with Google
                        </p>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() =>
                            signIn("github", {
                                redirect: true,
                            })
                        }
                        className={styles.button}
                    >
                        <p>
                            <span className={styles.logo}>
                                <Image
                                    src={GithubIcon}
                                    alt="Github icon"
                                    width={18}
                                    height={18}
                                    className={styles.img}
                                />{" "}
                            </span>
                            Continue with Github
                        </p>
                    </button>
                </li>
            </ul>
            <p className={styles.separator}>or</p>
            <form
                name="SignIn"
                className={styles.form}
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

                <input
                    ref={passwordInput}
                    aria-invalid="false"
                    className={styles.input}
                    required
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword((password) => e.target.value)}
                />

                <button className={`${styles.button} ${styles.signInButton}`}>
                    Login
                </button>
            </form>
            <p className={styles.separator}>
                <span>
                    <Link href="/reset" className={styles.a}>
                        Reset your password
                    </Link>
                </span>
            </p>
            <p className={styles.separator}>
                does not have an account yet ?
                <span>
                    {" "}
                    <Link href="/register" className={styles.a}>
                        Register
                    </Link>
                </span>
            </p>
            
        </div>
    );
}
