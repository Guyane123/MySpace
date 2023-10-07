import { createConversation } from "./actions";
import styles from "./Buttons.module.css";

export default function SendMessage({
    className,
    otherUserId,
}: {
    className?: string;
    otherUserId: string;
}) {
    return (
        <button
            className={styles.btn}
            onClick={() => createConversation(otherUserId)}
        >
            Send A Message
        </button>
    );
}
