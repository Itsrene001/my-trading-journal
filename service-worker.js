// service-worker.js

self.addEventListener('fetch', (event) => {
    // Standard pass-through
    event.respondWith(fetch(event.request));
});

// NEW: Listen for push notifications from the server/app
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || "Journal Pro Reminder";
    const options = {
        body: data.body || "Don't forget to review your trades for the day!",
        icon: 'icon.png',
        badge: 'icon.png', // Small icon for the status bar
        vibrate: [100, 50, 100],
        data: {
            url: self.location.origin // Where the user goes when they click
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});