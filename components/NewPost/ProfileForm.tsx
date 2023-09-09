import styles from "./NewPost.module.css";
import { createPost } from "./actions";

export default function ProfileForm() {
    return (
        <form action={createPost} className={styles.form}>
            <textarea
                className={styles.textarea}
                name="text"
                cols={128}
                rows={10}
                placeholder="What's up ?"
            ></textarea>
            <button type="submit" className={styles.btn}>
                Post
            </button>
        </form>
    );
}
