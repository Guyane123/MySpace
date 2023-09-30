import styles from "./page.module.css";

export function ClickOnSomething({ user }: any) {
    return (
        <div className={styles.clickOnSomething}>
            <h2 className={styles.title}>Select a setting</h2>

            <p>Choose a setting and adjust it as you wish</p>
        </div>
    );
}
