self.addEventListener('fetch', (event) => {
  // Basic pass-through for now to satisfy PWA requirements
  event.respondWith(fetch(event.request));
});