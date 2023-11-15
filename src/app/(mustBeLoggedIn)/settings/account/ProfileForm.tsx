"use client";

import { UserType } from "@/app/types";
import styles from "./page.module.css";
import { updateUser } from "@/app/api/updateUser";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AddImage from "./AddImage";

const MAX_WIDTH_BANNER_IMAGE = 400;
const MAX_HEIGTH_BANNER_IMAGE = 200;

const MAX_WIDTH_IMAGE = 64;
const MAX_HEIGTH_IMAGE = 64;

function calculateSize(
    img: HTMLImageElement,
    maxWidth: number,
    maxHeight: number
) {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
        }
    }
    return [width, height];
}

export default function ProfileForm({ user }: { user: any }) {
    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = {
            name: String(formData.get("name")),
            bio: String(formData.get("bio")),
            age: Number(String(formData.get("age"))),
            image: image,
            bannerImageId: bannerImage,
        };

        const updatedUser = await updateUser(body);
    };

    const [bannerImage, setBannerImage] = useState(
        user?.bannerImage
            ? user.bannerImage.binary
            : "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
    );
    const [image, setImage] = useState(
        user?.userImage
            ? user.userImage.binary
            : "https://thispersondoesnotexist.com"
    );

    return (
        <div className={styles.profileForm}>
            <form onSubmit={update} className={styles.flex} name="userForm">
                <div>
                    <AddImage
                        setImageBase64={setBannerImage}
                        image={bannerImage}
                        width={400}
                        heigth={150}
                        name={"file1"}
                    />

                    <AddImage
                        style={{ left: "25%", transform: "translateY(-50%)" }}
                        setImageBase64={setImage}
                        image={image}
                        width={64}
                        heigth={64}
                        name={"file2"}
                    />
                </div>

                <label htmlFor="name">Name</label>
                <input
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    width={16}
                    defaultValue={user?.name ?? ""}
                />
                <label htmlFor="bio">Bio</label>
                <textarea
                    className={styles.input}
                    id="bio"
                    name="bio"
                    cols={30}
                    rows={10}
                    defaultValue={user?.bio ?? ""}
                ></textarea>
                <label htmlFor="bio">Age</label>
                <input
                    className={styles.input}
                    type="text"
                    id="age"
                    name="age"
                    defaultValue={user?.age ?? ""}
                />

                <button type="submit" className={styles.btn}>
                    Save
                </button>
            </form>
        </div>
    );
}
