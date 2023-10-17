import styles from "./loading.module.css";

export default async function Loading() {
    return (
        <ul className={styles.ul}>
            <li className={styles.user}></li>
            <li className={styles.post}></li>
            <li className={styles.post}></li>
            <li className={styles.post}></li>
            <li className={styles.post}></li>
        </ul>
    );
}
