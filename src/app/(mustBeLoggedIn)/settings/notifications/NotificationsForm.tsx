"use client";

import styles from "./page.module.css";
import { changeNotificationsSettings } from "@/app/api/settings";
import { SettingType } from "@/app/types";

export default function NotificationsForm({
    currentSetting,
}: {
    currentSetting: SettingType;
}) {
    return (
        <>
            <form>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <label htmlFor="likeNotification">Likes</label>
                        <input
                            id="likeNotification"
                            type="checkbox"
                            name="likeNotification"
                            defaultChecked={currentSetting.likeNotification}
                            onChange={async (e) =>
                                await changeNotificationsSettings(
                                    e.target.name,
                                    e.target.checked
                                )
                            }
                        />
                    </li>
                    <li>
                        <label htmlFor="followNotification">Follow</label>
                        <input
                            id="followNotification"
                            type="checkbox"
                            defaultChecked={currentSetting.followNotification}
                            name="followNotification"
                            onChange={async (e) =>
                                await changeNotificationsSettings(
                                    e.target.name,
                                    e.target.checked
                                )
                            }
                        />
                    </li>
                    <li>
                        <label htmlFor="commentNotification">Comments</label>
                        <input
                            id="commentNotification"
                            type="checkbox"
                            name="commentNotification"
                            defaultChecked={currentSetting.commentNotification}
                            onChange={async (e) =>
                                await changeNotificationsSettings(
                                    e.target.name,
                                    e.target.checked
                                )
                            }
                        />
                    </li>
                    <li>
                        <label htmlFor="messageNotification">Messages</label>
                        <input
                            id="messageNotification"
                            type="checkbox"
                            name="messageNotification"
                            defaultChecked={currentSetting.messageNotification}
                            onChange={async (e) =>
                                await changeNotificationsSettings(
                                    e.target.name,
                                    e.target.checked
                                )
                            }
                        />
                    </li>
                </ul>
            </form>
        </>
    );
}
