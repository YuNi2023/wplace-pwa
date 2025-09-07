// sw.js — Pull方式：空Push受信→サーバから本文取得→通知表示

// あなたの Workers のベースURL
const WORKERS_BASE = "https://wplace-push.wplace-push-rinne.workers.dev";

// install/activate（お好みで）
self.addEventListener("install", (e) => {
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

// Push 受信：内容はサーバから取得（Pull）
self.addEventListener("push", (event) => {
  event.waitUntil((async () => {
    try {
      const reg = self.registration;
      const sub = await reg.pushManager.getSubscription();
      const endpoint = sub?.endpoint || "";

      // サーバから直近メッセージを取得（endpoint で逆引き）
      const url = new URL("/api/last-message", WORKERS_BASE);
      if (endpoint) url.searchParams.set("endpoint", endpoint);
      const resp = await fetch(url.toString(), { method: "GET" });
      let data = {};
      if (resp.ok) data = await resp.json();

      const title = data.title || "通知";
      const body  = data.body  || "新しいお知らせがあります";
      const nopts = {
        body,
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        data: { url: data.url || "" }
      };
      await reg.showNotification(title, nopts);
    } catch (err) {
      // フォールバック：サーバ取得に失敗しても鳴らす
      await self.registration.showNotification("通知", {
        body: "新しいお知らせがあります",
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png"
      });
    }
  })());
});

// 通知をタップしたときに URL があれば開く
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url;
  if (url) {
    event.waitUntil((async () => {
      const all = await clients.matchAll({ type: "window", includeUncontrolled: true });
      const client = all.find(c => new URL(c.url).href === url);
      if (client) return client.focus();
      return clients.openWindow(url);
    })());
  }
});
