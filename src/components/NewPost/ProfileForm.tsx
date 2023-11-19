"use client";

import { ChangeEvent, useRef, useState } from "react";
import styles from "./NewPost.module.css";
import { createPost } from "../../app/api/createPost";
import { EmojiList } from "../EmojiList/EmojiList";
import AddImage from "../addImage/AddImage";
import diff from "../../../lib/findDiff";

export default function ProfileForm({
    parrentId,
    canvas,
}: {
    parrentId?: String | null;
    canvas: React.MutableRefObject<HTMLCanvasElement | null>;
}) {
    const [value, setValue] = useState("");
    const [key, setKey] = useState("");
    const [selectionStart, setSelectionStart] = useState<number>(0);
    const [imageBase64, setImageBase64] = useState<string | undefined>(
        undefined
    );

    const ref = useRef<HTMLTextAreaElement | null>(null);

    // function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    //     // e.preventDefault();

    //     setKey(e.key);
    // }
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const el = e.target;

        setSelectionStart(el.selectionStart);

        // if (key == "@") {
        //     console.log(true);

        //     const before = e.target.value.slice(0, selectionStart);
        //     const current = "<a>HELLO</a>";
        //     const after = e.target.value.slice(selectionStart);

        //     setKey("null");
        //     setValue(before + current + after);
        //     return;
        // }

        setValue(e.target.value);

        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const content = ref.current?.value;

        createPost(content!, parrentId, imageBase64);

        ref.current!.value = "";
    }

    function handleClick(e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) {
        e.preventDefault();

        setSelectionStart(ref.current?.selectionStart!);
    }
    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}
            name="newPostForm "
        >
            {/* <EmojiList input={ref} /> */}
            <div className={styles.textareaContainer}>
                <textarea
                    // onKeyDown={(e) => handleKeyDown(e)}
                    ref={ref}
                    maxLength={280}
                    className={styles.text}
                    name="text"
                    cols={1}
                    rows={1}
                    onChange={(e) => handleChange(e)}
                    placeholder="What's up ?"
                    onClick={(e) => handleClick(e)}
                    value={value}
                ></textarea>
            </div>

            <div className={styles.newPostMore}>
                <EmojiList
                    setValue={setValue}
                    selectionStart={selectionStart!}
                    value={value}
                />

                <AddImage canvas={canvas} setImageBase64={setImageBase64} />

                <button type="submit" className={styles.btn}>
                    Post
                </button>
            </div>
        </form>
    );
}
