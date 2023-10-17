"use client";

const colorContextState = {
    color: "white" as "white",
    setColor: () => {},
};

export const colorContext = createContext<ColorContextType>(colorContextState);

import { SessionProvider } from "next-auth/react";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode;
};

type ColorContextType = {
    color: "white" | "black" | "pink";
    setColor: React.Dispatch<React.SetStateAction<"white" | "black" | "pink">>;
};

export default function AuthProvider({ children }: Props) {
    const [color, setColor] = useState<"white" | "black" | "pink">("pink");

    const currentPath = usePathname();

    useEffect(() => {
        if (currentPath == "/signin") {
            setColor("pink");
        } else {
            console.log(currentPath);
        }
    }, []);
    const [queryClient] = useState(
        new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
    );

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <colorContext.Provider value={{ color, setColor }}>
                    {children}
                </colorContext.Provider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
