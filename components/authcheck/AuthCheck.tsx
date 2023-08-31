"use client";

import { useSession } from "next-auth/react";

export default function AuthCheck() {
    const { data: session, status } = useSession();

    console.log(status, " ", session);

    return (
        <main>
            {status}
            <h4>{session?.toString()}</h4>
        </main>
    );
}
