export async function Emoji({ emoji }: { emoji: number }) {
    return <span>&#{emoji};</span>;
}
