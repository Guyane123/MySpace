/* eslint-disable @next/next/no-img-element */

"use client";
import DeleteButtonImage from "../../public/trash.svg";
import styles from "./Post.module.css";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { deletePost } from "@/app/api/post";
import { PostType } from "@/app/types";

type Props = {
    post: PostType;
};

export default function DeleteButton({ post }: Props) {
    return (
        <>
            <button className={styles.btn} onClick={() => deletePost(post.id)}>
                <Image
                    src={DeleteButtonImage}
                    alt="Delete Button"
                    width={16}
                    height={16}
                />
            </button>
        </>
    );
}
