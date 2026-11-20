// Pings IndexNow (Bing, Yandex, Seznam, Naver; also used by ChatGPT/Copilot search via Bing)
// with every URL in the live sitemap. Run: node scripts/indexnow.mjs
const HOST = "pakarabmanpowersupply.ae";
const KEY = "4df8e47e889b7dd098328fe33dc8eba6";
const res = await fetch(`https://${HOST}/sitemap.xml`);
if (!res.ok) throw new Error(`sitemap ${res.status}`);
const urls = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${r.status} for ${urls.length} URLs`);
if (r.status >= 400) process.exit(1);
