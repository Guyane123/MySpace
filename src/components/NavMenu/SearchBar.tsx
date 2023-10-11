import Link from "next/link";
import styles from "./NavMenu.module.css";
import Image from "next/image";
import Logo from "@/../public/logo.svg";
import { useEffect, useRef, useState } from "react";
import { UserType } from "@/app/types";
import { prisma } from "../../../lib/prisma";
import { searchUsers } from "./actions";

export default function SearchBar() {
    const [value, setValue] = useState<string>("");
    const [searched, setSearched] = useState<Array<UserType> | null>(null);
    const ref = useRef<HTMLFormElement | null>(null);
    const searchContent = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        searchContent.current!.style.right = "16px";
        const handleOutSideClick = (event: any) => {
            if (!ref.current?.contains(event.target)) {
                searchContent.current!.style.scale = "0%";
            } else {
                searchContent.current!.style.scale = "100%";
            }
        };

        async function getUsers() {
            const users = await searchUsers(value);

            setSearched(users);
        }

        getUsers();

        console.log(searched);

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [value]);

    return (
        <>
            <Link href={"/search"} className={`${styles.a} ${styles.searchA}`}>
                <Image src={Logo} alt="logo" height={48} width={117} />
            </Link>

            <div className={styles.searchbar}>
                <form
                    onSubmit={() => setValue(value)}
                    ref={ref}
                    className={styles.searchbarWrapper}
                >
                    <button type="submit"></button>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="search.."
                        value={value}
                        onChange={(e) => {
                            setValue((value) => e.target.value);
                        }}
                    />
                    <button onClick={() => setValue("")}>X</button>
                </form>
                <div className={styles.searchContent} ref={searchContent}>
                    {searched
                        ? searched.map((user) => {
                              return user.name;
                          })
                        : ""}
                </div>
            </div>
        </>
    );
}
