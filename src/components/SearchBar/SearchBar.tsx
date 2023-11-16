/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Close from "@/../public/cross.svg";
import Search from "@/../public/search.svg";
import styles from "./SearchBar.module.css";
import { UserType } from "@/app/types";
import { searchUsers } from "../../app/api/searchUsers";

import { useRouter } from "next/navigation";
import Link from "next/link";
import setCookie, { getCookie } from "../../app/api/cookieCategory";

export default function SearchBar() {
    const [value, setValue] = useState<string>("");
    const [searched, setSearched] = useState<Array<UserType> | null>(null);

    const router = useRouter();

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

    useEffect(() => {
        async function setDefaultValue() {
            const currentSearch = await getCookie("currentSearch");
            setValue(currentSearch as string);
        }
    }, []);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
        value: string
    ) {
        e.preventDefault();

        const currentCategory = await getCookie("currentCategory");

        if (!(currentCategory == "Search")) {
            router.push("search");
        }
        setValue(value);

        await setCookie("currentCategory", "Search");
        await setCookie("currentSearch", value);
    }
    function handleChange(value: string) {
        setValue(value);
    }

    return (
        <div className={styles.searchbar} ref={ref}>
            <div className={styles.input}>
                <form
                    name="searchForm"
                    className={styles.input}
                    onSubmit={(e) => handleSubmit(e, value)}
                >
                    <button className={styles.searchBtn} type="submit">
                        <Link
                            href={`/search`}
                            className="w-full h-full"
                            type="submit"
                            onClick={async () => {
                                await setCookie("currentSearch", value);
                            }}
                        >
                            <Image
                                src={Search}
                                height={24}
                                width={24}
                                alt="Search button"
                            />
                        </Link>
                    </button>
                    <input
                        autoComplete="off"
                        id="search"
                        name="search"
                        defaultValue={value}
                        placeholder="search..."
                        type="text"
                        className={styles.input}
                        onChange={(e) => handleChange(e.target.value)}
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
                </form>
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
                                          <img
                                              src={user.userImage!}
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
