/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Buttons.module.css";
import { createConversation } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";

export function SignInButton({ className }: { className?: string }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <>...</>;
    }

    if (status === "authenticated") {
        return (
            <Link href={`/settings`}>
                <img
                    className={styles.img}
                    src={session.user?.image ?? "/mememan.webp"}
                    width={32}
                    height={32}
                    alt="Your profile picture"
                />
            </Link>
        );
    }

    return (
        <button className={styles.btn} onClick={() => signIn()}>
            Sign in
        </button>
    );
}

export function SignOutButton({ className }: { className?: string }) {
    return (
        <button className={styles.btn} onClick={() => signOut()}>
            Sign Out
        </button>
    );
}

export function SendMessage({
    className,
    otherUserId,
}: {
    className?: string;
    otherUserId: string;
}) {
    return (
        <button
            className={styles.btn}
            onClick={() => createConversation(otherUserId)}
        >
            Send A Message
        </button>
    );
}
