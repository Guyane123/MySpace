"use client";

import styles from "./Register.module.css";
import Image from "next/image";
import GithubIcon from "@/../public/github-mark.svg";
import GoogleIcon from "@/../public/Google.svg";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import Link from "next/link";

export default function SignInForm() {
    const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const numbers = /\d/;
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const err = useRef<HTMLDivElement | null>(null);

    const emailInput = useRef<HTMLInputElement | null>(null);
    const passwordInput = useRef<HTMLInputElement | null>(null);
    const confirmPasswordInput = useRef<HTMLInputElement | null>(null);
    const usernameInput = useRef<HTMLInputElement | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = {
            email: formData.get("email"),
            username: formData.get("username"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };

        console.log(user);

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
        if (!user.username) {
            err.current.innerHTML += "Please provide an username. <br />";

            usernameInput.current!.ariaInvalid = "true";
        }
        if (!user.password) {
            err.current.innerHTML += "Please provide a password. <br />";

            passwordInput.current!.ariaInvalid = "true";
        }

        if (!(user.password == user.confirmPassword)) {
            err.current.innerHTML += "The passwords doesn't match. <br />";

            confirmPasswordInput.current!.ariaInvalid = "true";
        } else if (password.length < 8) {
            err.current.innerHTML +=
                "The passwords must contain alteast 8 characters. <br />";
            passwordInput.current!.ariaInvalid = "true";
        } else if (!specialCharacters.test(String(user.password))) {
            err.current.innerHTML +=
                "The passwords must contain alteast 1 special character. <br />";
            passwordInput.current!.ariaInvalid = "true";
        } else if (!numbers.test(String(user.password))) {
            err.current.innerHTML +=
                "The passwords must contain alteast 1 number. <br />";
            passwordInput.current!.ariaInvalid = "true";
        }

        if (err.current.innerHTML) {
            return null;
        }

        passwordInput.current!.ariaInvalid = "false";
        emailInput.current!.ariaInvalid = "false";
        confirmPasswordInput.current!.ariaInvalid = "false";
        usernameInput.current!.ariaInvalid = "false";

        err.current.innerHTML = "";

        console.log({
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
        });
        signIn("credentials", {
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            redirect: true,
            callbackUrl: "/",
        });
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
                                callbackUrl: "/",
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
                                callbackUrl: "/",
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
                    ref={usernameInput}
                    aria-invalid="false"
                    className={styles.input}
                    required
                    type="text"
                    id="username"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => setUsername((username) => e.target.value)}
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
                <input
                    ref={confirmPasswordInput}
                    aria-invalid="false"
                    className={styles.input}
                    required
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword((confirmPassword) => e.target.value)
                    }
                />

                <button className={`${styles.button} ${styles.signInButton}`}>
                    Create an account
                </button>
            </form>
            <p className={styles.separator}>
                <span>By registering you allow the usage of cookies.</span>
            </p>
            <p className={styles.separator}>
                Already have an account ?
                <span>
                    {" "}
                    <Link href="/login" className={styles.a}>
                        Log in
                    </Link>
                </span>
            </p>
        </div>
    );
}
