const urls = [
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800"
];

async function checkUrl(url, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { method: 'GET', signal: controller.signal });
    clearTimeout(id);
    return { url, status: res.status };
  } catch (err) {
    clearTimeout(id);
    return { url, error: err.message || String(err) };
  }
}

(async () => {
  console.log('Checking Urban Designer Loft image URLs...');
  for (const url of urls) {
    const res = await checkUrl(url);
    if (res.error) {
      console.log(`FAILED: ${res.url} -> ${res.error}`);
    } else {
      console.log(`STATUS ${res.status}: ${res.url}`);
    }
  }
})();
