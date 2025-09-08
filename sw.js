self.addEventListener('install', (e) => {
  // すぐに新SWを有効化
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // 既存クライアントに即時適用
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = {};
  try {
    if (event.data) data = event.data.json();
  } catch (_e) {
    // JSONでない場合はテキストとして扱う
    data = { title: '通知', body: event.data?.text() ?? '' };
  }

  const title = data.title || '通知';
  const options = {
    body: data.body || '',
    icon: data.icon || '/icon-192.png',
    badge: data.badge || '/icon-192.png',
    data: data, // クリック遷移用に保持
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url;
  if (url) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(winArr => {
        const had = winArr.find(w => w.url === url);
        if (had) return had.focus();
        return clients.openWindow(url);
      })
    );
  }
});
