"use client";

import Link from "next/link";
import styles from "./NavMenu.module.css";
import Image from "next/image";
import Logo from "@/../public/logo.svg";
import Search from "@/../public/search.svg";
import Cross from "@/../public/cross.svg";
import { useEffect, useRef, useState } from "react";
import { UserType } from "@/app/types";
import { prisma } from "../../../lib/prisma";
import { searchUsers } from "./actions";
import { redirect } from "next/navigation";
import setCookie, { getCookie } from "../Categories/actions";

export default function SearchBar() {
    const [value, setValue] = useState<string>("");
    const [searched, setSearched] = useState<Array<UserType> | null>(null);
    const ref = useRef<HTMLFormElement | null>(null);
    const searchContent = useRef<HTMLDivElement | null>(null);
    const input = useRef<HTMLInputElement | null>(null);
    const userList = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        searchContent.current!.style.right = "16px";
        const handleOutSideClick = (event: any) => {
            if (
                !ref.current?.contains(event.target)
                // userList.current?.contains(event.target)
            ) {
                searchContent.current!.style.scale = "0%";
                console.log(event.target);
            } else {
                searchContent.current!.style.scale = "100%";
            }
        };

        async function getUsers() {
            const users = await searchUsers(value);

            setSearched(users);
        }

        getUsers();

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [value]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const currentCategory = await getCookie("currentCategory");

        if (!(currentCategory == "Search")) {
            await setCookie("currentCategory", "Search");
            redirect("/search");
        }

        await setCookie("currentSearch", value);
    }

    return (
        <>
            <div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    ref={ref}
                    className={styles.searchInput}
                >
                    <button
                        type="submit"
                        className={`${styles.search} ${styles.submitBtn}`}
                    >
                        <Image
                            src={Search}
                            width={24}
                            height={24}
                            alt="search logo"
                        />
                    </button>
                    <input
                        className={styles.input}
                        type="text"
                        ref={input}
                        placeholder="search.."
                        value={value}
                        onChange={(e) => {
                            setValue((value) => e.target.value);
                        }}
                    />

                    <div className={styles.resultBox} ref={searchContent}>
                        <ul className={styles.userList} ref={userList}>
                            {searched
                                ? searched.map((user, k) => {
                                      return (
                                          <li key={k} className={styles.userLi}>
                                              <Link
                                                  key={k}
                                                  onClick={() =>
                                                      console.log("ddd")
                                                  }
                                                  className={styles.a}
                                                  href={`/users/${user.id}`}
                                              >
                                                  <Image
                                                      className={styles.userImg}
                                                      width={32}
                                                      height={32}
                                                      src={user.image!}
                                                      alt={`${user.name}'s pfp`}
                                                  />

                                                  <p>{user.name}</p>
                                              </Link>
                                          </li>
                                      );
                                  })
                                : ""}
                        </ul>
                    </div>
                    <button
                        className={`${styles.close} ${styles.submitBtn}`}
                        onClick={() => setValue("")}
                    >
                        <Image
                            src={Cross}
                            height={16}
                            width={16}
                            alt="cross logo"
                        />
                    </button>
                </form>
            </div>
        </>
    );
}
