"use server";

import fetchSaveSubscribtion from "./fetchSaveSubscribtion";
import webpush from "web-push";

export default async function createPushNotification(targetId: string) {
    const vapidKeys = {
        publicKey: process.env.PUSHPUBLICKEY!,
        privateKey: process.env.PUSHPRIVATEKEY!,
    };

    webpush.setVapidDetails(
        "mailto:https://pink-berries-i9hk.vercel.app",
        process.env.PUSHPUBLICKEY!,
        process.env.PUSHPRIVATEKEY!
    );
    const subscriptions = await fetchSaveSubscribtion(targetId);

    subscriptions.forEach((subscription) => {
        const formattedSubscribtion = {
            keys: {
                p256dh: subscription?.p256dhKey!,
                auth: subscription?.authKey!,
            },
            endpoint: subscription?.endpoint!,
        };

        const options = {
            vapidDetails: {
                subject: "mailto:https://pink-berries-i9hk.vercel.app",
                publicKey: vapidKeys.publicKey,
                privateKey: vapidKeys.privateKey,
            },
            headers: {
                PinkberriesHeader: "PinkberriesHeaders",
            },
            topic: "PinkberriesTopic",
        };

        var payload = {
            title: "This is a title",
            body: "this is the body",
            icon: "images/someImageInPath.png",
        };

        const message = webpush
            .sendNotification(
                formattedSubscribtion,
                "Vous avez une nouvelle notification."
            )
            .then(function () {
                console.log(JSON.stringify(payload));
            })
            .catch((e) => console.log(e));
    });


}
