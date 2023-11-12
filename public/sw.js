self.addEventListener("install", function (event) {
    // console.log("Hello world from the Service Worker 🤙");
});

self.addEventListener("push", function (event) {
    console.log("ddd");
    const title = "Pinkberries";
    const options = {
        body: "Vous avez une nouvelle notification",
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
