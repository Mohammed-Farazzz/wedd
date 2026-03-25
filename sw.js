/* ═══════════════════════════════════════════════════════
   Service Worker — Wedding Invitation
   Handles push notifications and reminder scheduling
   ═══════════════════════════════════════════════════════ */

const CACHE_NAME = 'wedding-invite-v1';

// Install event
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Listen for messages from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_REMINDERS') {
        const weddingDate = event.data.weddingDate;
        scheduleReminders(weddingDate);
    }
});

// Push event (for future FCM integration)
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || '💍 Wedding Reminder';
    const options = {
        body: data.body || "Don't forget about the wedding celebration!",
        icon: data.icon || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💍</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💍</text></svg>',
        vibrate: [200, 100, 200],
        tag: data.tag || 'wedding-reminder',
        requireInteraction: true,
        actions: [
            { action: 'open', title: 'View Invitation' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (event.action === 'dismiss') return;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Focus existing window or open new one
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            return clients.openWindow('/');
        })
    );
});

// Schedule reminders using setTimeout (works while SW is alive)
function scheduleReminders(weddingDateMs) {
    const now = Date.now();
    const oneWeekBefore = weddingDateMs - 7 * 24 * 60 * 60 * 1000;
    const oneDayBefore = weddingDateMs - 1 * 24 * 60 * 60 * 1000;
    const oneHourBefore = weddingDateMs - 1 * 60 * 60 * 1000;

    const reminders = [
        {
            time: oneWeekBefore,
            title: '📅 One Week to Go!',
            body: "Ammar & Juveriya's wedding is just one week away! Mark your calendar.",
            tag: 'wedding-one-week'
        },
        {
            time: oneDayBefore,
            title: '🌙 Tomorrow is the Big Day!',
            body: "Ammar & Juveriya's Nikah is tomorrow. Don't forget to attend!",
            tag: 'wedding-one-day'
        },
        {
            time: oneHourBefore,
            title: '🕌 Starting in 1 Hour!',
            body: 'The Nikah ceremony begins in just one hour at Masjid-e-Baitul Mukarram!',
            tag: 'wedding-one-hour'
        }
    ];

    reminders.forEach(r => {
        const delay = r.time - now;
        if (delay > 0) {
            setTimeout(() => {
                self.registration.showNotification(r.title, {
                    body: r.body,
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💍</text></svg>',
                    tag: r.tag,
                    vibrate: [200, 100, 200],
                    requireInteraction: true
                });
            }, Math.min(delay, 2147483647));
        }
    });
}
