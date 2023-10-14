import styles from "./loading.module.css";

export default async function Loading() {
    return (
        <ul className={styles.ul}>
            <li className={styles.newPost}></li>
            <li className={styles.post}></li>
            <li className={styles.post}></li>
            <li className={styles.post}></li>
            <li className={styles.post}></li>
        </ul>
    );
}
