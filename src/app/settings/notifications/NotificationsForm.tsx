"use client";

import styles from "./page.module.css";
import { changeNotificationsSettings } from "../../../../components/Settings/actions";

export default function NotificationsForm() {
    return (
        <>
            <form>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <label htmlFor="likes">Likes</label>
                        <input
                            type="checkbox"
                            name="likes"
                            onChange={async (e) =>
                                await changeNotificationsSettings(
                                    e.target.name,
                                    e.target.value
                                )
                            }
                        />
                    </li>
                    <li>
                        <label htmlFor="follows">Follow</label>
                        <input
                            type="checkbox"
                            name="follows"
                            onChange={async (e) =>
                                await changeNotificationsSettings(
                                    e.target.name,
                                    e.target.value
                                )
                            }
                        />
                    </li>
                    <li>
                        <label htmlFor="comments">Comments</label>
                        <input
                            type="checkbox"
                            name="comments"
                            onChange={async (e) =>
                                await changeNotificationsSettings(
                                    e.target.name,
                                    e.target.value
                                )
                            }
                        />
                    </li>
                    <li>
                        <label htmlFor="message">Messages</label>
                        <input
                            type="checkbox"
                            name="messages"
                            onChange={async (e) =>
                                await changeNotificationsSettings(
                                    e.target.name,
                                    e.target.value
                                )
                            }
                        />
                    </li>
                </ul>
            </form>
        </>
    );
}
