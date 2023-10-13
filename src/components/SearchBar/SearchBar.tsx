"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Close from "@/../public/cross.svg";
import Search from "@/../public/search.svg";
import styles from "./SearchBar.module.css";
import { UserType } from "@/app/types";
import { searchUsers } from "../NavMenu/actions";
import Link from "next/link";
import setCookie, { getCookie } from "../Categories/actions";
import { redirect } from "next/navigation";

export default function SearchBar() {
    const [value, setValue] = useState<string>("");
    const [searched, setSearched] = useState<Array<UserType> | null>(null);

    const ref = useRef<HTMLDivElement | null>(null);
    const results = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleOutSideClick = (event: any) => {
            if (!ref.current?.contains(event.target)) {
                results.current!.style.scale = "0%";
            } else {
                results.current!.style.scale = "100%";
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        async function getUsers() {
            const users = await searchUsers(value);

            setSearched(users);
        }

        getUsers();

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [value]);

    async function handleSubmit(value: string) {
        setValue(value);
    }
    async function handleClick(value: string) {
        const currentCategory = await getCookie("currentCategory");

        await setCookie("currentSearch", value);

        if (currentCategory == "Search") {
            return null;
        }

        redirect("/search");
    }

    return (
        <div className={styles.searchbar} ref={ref}>
            <div className={styles.input}>
                <button
                    className={styles.searchBtn}
                    onClick={async (e) => {
                        await handleClick(value);
                    }}
                >
                    <Image
                        src={Search}
                        height={24}
                        width={24}
                        alt="Search button"
                    />
                </button>
                <input
                    placeholder="search..."
                    type="text"
                    className={styles.input}
                    onChange={async (e) => await handleSubmit(e.target.value)}
                />
                <button
                    className={styles.closeBtn}
                    onClick={() => setValue("")}
                >
                    <Image
                        src={Close}
                        height={24}
                        width={24}
                        alt="Close button"
                    />
                </button>
            </div>

            <div className={styles.results} ref={results}>
                <ul>
                    {searched
                        ? searched.map((user, k) => {
                              return (
                                  <li key={k}>
                                      <Link
                                          href={`/users/${user.id}`}
                                          className={styles.a}
                                      >
                                          <Image
                                              src={user.image!}
                                              width={32}
                                              height={32}
                                              alt="pfp"
                                          />
                                          <p>{user.name}</p>
                                      </Link>
                                  </li>
                              );
                          })
                        : ""}
                </ul>
            </div>
        </div>
    );
}
