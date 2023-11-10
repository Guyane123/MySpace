"use client";

export function Emoji({
    unicode,
    addEmoji,
}: {
    unicode: string;
    addEmoji: (unicode: string) => void;
}) {
    return <div onClick={(e) => addEmoji(unicode)}>{unicode}</div>;
}
