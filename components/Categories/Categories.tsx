import Link from "next/link";
import styles from "./Categories.module.css";

export default async function Categories() {
    return (
        <div>
            <ul className={styles.list}>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/subscribtions"}>Subscribtions</Link>
                </li>
            </ul>
        </div>
    );
}
