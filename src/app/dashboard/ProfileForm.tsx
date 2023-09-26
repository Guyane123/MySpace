"use client";

import Image from "next/image";
import { FormEvent } from "react";
import { json } from "stream/consumers";
import styles from "./page.module.css";
import { UserType } from "../types";

export function ProfileForm({ user }: any) {
    const currentUser: UserType = JSON.parse(user.value);

    const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = {
            name: formData.get("name"),
            bio: formData.get("bio"),
            age: formData.get("age"),
            image: formData.get("image"),
        };

        const res = await fetch("http://localhost:3000/api/user", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        await res.json();
    };

    return (
        <div>
            <h2 className={styles.subTitle}>Edit your profile</h2>
            <form onSubmit={updateUser} className={styles.flex}>
                <label htmlFor="name">Name</label>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    width={16}
                    defaultValue={currentUser?.name ?? ""}
                />
                <label htmlFor="bio">Bio</label>
                <textarea
                    className={styles.input}
                    name="bio"
                    cols={30}
                    rows={10}
                    defaultValue={currentUser?.bio ?? ""}
                ></textarea>
                <label htmlFor="bio">Age</label>
                <input
                    className={styles.input}
                    type="text"
                    name="age"
                    defaultValue={currentUser?.age ?? ""}
                />
                <label htmlFor="image">Image</label>
                <input
                    className={styles.input}
                    type="url"
                    name="image"
                    defaultValue={currentUser?.image ?? ""}
                />

                <button type="submit" className={styles.btn}>
                    Save
                </button>
            </form>
        </div>
    );
}
