self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {};
  }

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Wplace通知',
      {
        body: data.body || '',
        icon: './icons/icon-192.png',
        badge: './icons/icon-192.png'
      }
    )
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('./'));
});
