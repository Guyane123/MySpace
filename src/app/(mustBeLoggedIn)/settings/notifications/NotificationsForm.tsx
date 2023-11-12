"use client";

import { createSaveSubscription } from "@/app/api/createSaveSubscription";
import styles from "./page.module.css";
import { changeNotificationsSettings } from "@/app/api/settings";
import { SettingType } from "@/app/types";
import { useEffect, useState } from "react";

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default function NotificationsForm({
    currentSetting,
}: {
    currentSetting: SettingType;
}) {
    const [permission, setPermission] = useState<boolean>(false);

    const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
            "BPV0QVXe9cz2n1V6eFXLSojLXNq2_XlZx0DilEHWZGZ4jqDqKDBRL6Q0ilwaWcMsUvplfpiKk6_mwsu8Yl6ECsk"
        ),
    };
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").then(
                function (registration) {
                    registration.pushManager
                        .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey:
                                "BPV0QVXe9cz2n1V6eFXLSojLXNq2_XlZx0DilEHWZGZ4jqDqKDBRL6Q0ilwaWcMsUvplfpiKk6_mwsu8Yl6ECsk",
                        })
                        .then((res) =>
                            // console.log(
                            //     Buffer.from(res.getKey("p256dh")!),
                            //     Buffer.from(res.getKey("auth")!),
                            //     res.endpoint
                            // )
                            createSaveSubscription(
                                Array.from(
                                    new Uint8Array(res.getKey("p256dh")!)
                                ),
                                Array.from(new Uint8Array(res.getKey("auth")!)),
                                res.endpoint
                            )
                        );
                },
                function (err) {
                    console.log("Service Worker registration failed: ", err);
                }
            );
        }
    }, []);

    useEffect(() => {
        async function getPermission() {
            const checkPermission = await Notification.permission;
            setPermission(checkPermission == "granted");
        }

        getPermission();
    }, []);

    function handlePushNotificationChange() {
        Notification.requestPermission().then((permission) =>
            setPermission(permission == "granted")
        );

        if (permission && permission) {
            alert(
                "To manage notification permissions, please go to your browser settings and find the section for site notifications. You can then manage permissions for this site."
            );
        }
    }
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
                    <li>
                        <label htmlFor="pushNotifications">
                            Allow push Notifications
                        </label>
                        <input
                            id="pushNotifications"
                            type="checkbox"
                            name="pushNotifications"
                            checked={permission}
                            onChange={() => handlePushNotificationChange()}
                        />
                    </li>
                </ul>
            </form>
        </>
    );
}
