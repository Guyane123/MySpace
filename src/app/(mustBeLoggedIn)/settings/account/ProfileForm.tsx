"use client";

import { UserType } from "@/app/types";
import styles from "./page.module.css";
import { updateUser } from "@/app/api/updateUser";

export function ProfileForm({ user }: { user: any }) {
    const currentUser: UserType = user;

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = {
            name: String(formData.get("name")),
            bio: String(formData.get("bio")),
            age: Number(String(formData.get("age"))),
            image: String(formData.get("image")),
            bannerImage: String(formData.get("bannerImage")),
        };

        const updatedUser = await updateUser(body);
    };

    return (
        <div className={styles.profileForm}>
            <h2 className={styles.subTitle}>Edit your profile</h2>
            <form onSubmit={update} className={styles.flex} name="userForm">
                <label htmlFor="name">Name</label>
                <input
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    width={16}
                    defaultValue={currentUser?.name ?? ""}
                />
                <label htmlFor="bio">Bio</label>
                <textarea
                    className={styles.input}
                    id="bio"
                    name="bio"
                    cols={30}
                    rows={10}
                    defaultValue={currentUser?.bio ?? ""}
                ></textarea>
                <label htmlFor="bio">Age</label>
                <input
                    className={styles.input}
                    type="text"
                    id="age"
                    name="age"
                    defaultValue={currentUser?.age ?? ""}
                />
                <label htmlFor="image">Image</label>
                <input
                    className={styles.input}
                    id="image"
                    type="url"
                    name="image"
                    defaultValue={currentUser?.image ?? ""}
                />
                <label htmlFor="bannerImage">Banner Image</label>
                <input
                    className={styles.input}
                    id="bannerImage"
                    type="url"
                    name="bannerImage"
                    defaultValue={currentUser?.bannerImage ?? ""}
                />

                <button type="submit" className={styles.btn}>
                    Save
                </button>
            </form>
        </div>
    );
}
