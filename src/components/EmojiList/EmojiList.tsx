import { MutableRefObject } from "react";
import styles from "./EmojiList.module.css";

type EmojiListType = {
    input: MutableRefObject<HTMLTextAreaElement | null>;
};

export async function EmojiList({ input }: EmojiListType) {
    return <div onClick={(e) => (input.current!.innerHTML = "dd")}>P</div>;
}
