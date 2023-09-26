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
