"use client";

import { SessionProvider } from "next-auth/react";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";

type Props = {
    children: React.ReactNode;
};

type postType = {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
};

// const placeholderPost = [
//     {
//         id: "test",
//         content: "test",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         authorId: "test",
//     },
// ];

export default function AuthProvider({ children }: Props) {
    const [queryClient] = useState(
        new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
    );

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
}
