"use client";

import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./ProfilePicture.module.css";
/* eslint-disable @next/next/no-img-element */

type propsType = {
    width: number | undefined;
    height: number | undefined;
    link: string | undefined;
};

export default function ProfilePicture({ width = 32, height = 32 }: propsType) {
    const session = useSession();

    const [image, setImg] = useState("https://thispersondoesnotexist.com");

    useEffect(() => {
        async function getPfp() {
            const user = await fetchCurrentUser();
            setImg(user?.image!);
        }

        getPfp();
    }, []);

    return (
        <img
            className={styles.pfp}
            src={image ? image : "https://thispersondoesnotexist.com"}
            alt={`${session.data?.user?.name}'s pfp`}
            width={width}
            height={height}
        />
    );
}
