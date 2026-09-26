/* 如鸢招募 · Service Worker（本地缓存，加载过一次后秒开、断网也能用） */
const VERSION = 'v0926a';
const CORE_CACHE = 'yiruan-core-' + VERSION;
/* 图片缓存名**不带代码版本号**：改代码（0920m→n→o…）不再清空 120 张图，
   只有真正换了图片内容时才手动 bump IMG_VERSION。 */
const IMG_VERSION = 'i0926a';
const IMG_CACHE  = 'yiruan-img-' + IMG_VERSION;

/* 核心文件：安装时立即缓存 */
const CORE = [
  './',
  './index.html',
  './xlsx.full.min.js',
  './manifest.webmanifest',
  './images/appicon.png'
];

/* 全部图片清单：页面加载完后后台静默缓存，之后访问全部走本地 */
const IMAGES = [
  'images/char/令狐茂.jpg',
  'images/char/凌统.jpg',
  'images/char/刘璋.jpg',
  'images/char/刘繇.jpg',
  'images/char/刘豹.jpg',
  'images/char/华佗.jpg',
  'images/char/司马徽.jpg',
  'images/char/吕布.jpg',
  'images/char/吕蒙.jpg',
  'images/char/周瑜.jpg',
  'images/char/士燮.jpg',
  'images/char/夏侯惇.jpg',
  'images/char/夏侯渊.jpg',
  'images/char/太史慈.jpg',
  'images/char/孔融.jpg',
  'images/char/孙尚香.jpg',
  'images/char/孙权.jpg',
  'images/char/安期.jpg',
  'images/char/干吉.jpg',
  'images/char/庞德.jpg',
  'images/char/庞统.jpg',
  'images/char/庞羲.jpg',
  'images/char/张仲景.jpg',
  'images/char/张修.jpg',
  'images/char/张昭.jpg',
  'images/char/张燕.jpg',
  'images/char/张绣.jpg',
  'images/char/张角.jpg',
  'images/char/张辽.jpg',
  'images/char/张邈.jpg',
  'images/char/张郃.jpg',
  'images/char/张闿.jpg',
  'images/char/张飞.jpg',
  'images/char/张鲁.jpg',
  'images/char/徐庶.jpg',
  'images/char/戏学.jpg',
  'images/char/曹丕.jpg',
  'images/char/曹植.jpg',
  'images/char/朱然.jpg',
  'images/char/杨修.jpg',
  'images/char/法正.jpg',
  'images/char/满宠.jpg',
  'images/char/王粲.jpg',
  'images/char/甄宓.jpg',
  'images/char/甘宁.jpg',
  'images/char/祢衡.jpg',
  'images/char/程昱.jpg',
  'images/char/程普.jpg',
  'images/char/简雍.jpg',
  'images/char/荀彧.jpg',
  'images/char/荀攸.jpg',
  'images/char/葛洪.jpg',
  'images/char/董奉.jpg',
  'images/char/董白.jpg',
  'images/char/蒯越.jpg',
  'images/char/蔡琰.jpg',
  'images/char/虞翻.jpg',
  'images/char/诸葛亮.jpg',
  'images/char/诸葛瑾.jpg',
  'images/char/诸葛诞.jpg',
  'images/char/贾诩.jpg',
  'images/char/郭嘉.jpg',
  'images/char/郭女王.jpg',
  'images/char/郭解.jpg',
  'images/char/钟繇.jpg',
  'images/char/陆逊.jpg',
  'images/char/马腾.jpg',
  'images/char/马超.jpg',
  'images/char/鲁肃.jpg',
  'images/char/黄月英.jpg',
  'images/char/黄盖.jpg',
  'images/pool/东阁待贤.jpg',
  'images/pool/九门磔攘.jpg',
  'images/pool/云雨滂润.jpg',
  'images/pool/击金鸣鼓.jpg',
  'images/pool/动如雷霆.jpg',
  'images/pool/却月凌风.jpg',
  'images/pool/壑林邀月.jpg',
  'images/pool/天弧封狼.jpg',
  'images/pool/天道不逾.jpg',
  'images/pool/奉天华盖.jpg',
  'images/pool/契阔谈宴.jpg',
  'images/pool/异才奇士.jpg',
  'images/pool/弓剑江东.jpg',
  'images/pool/弹剑酿花.jpg',
  'images/pool/弹香展骥.jpg',
  'images/pool/彀弓衔刃.jpg',
  'images/pool/形气复生.jpg',
  'images/pool/形谍成光.jpg',
  'images/pool/暮燕翻雷.jpg',
  'images/pool/桓桓先征.jpg',
  'images/pool/欺天罔地.jpg',
  'images/pool/游说贤士.jpg',
  'images/pool/燕金募秀.jpg',
  'images/pool/王侯秉德.jpg',
  'images/pool/珠渊玉水.jpg',
  'images/pool/白日昭只.jpg',
  'images/pool/织囊画诗.jpg',
  'images/pool/绣衣天下.jpg',
  'images/pool/绮花隐豹.jpg',
  'images/pool/腾陵张胆.jpg',
  'images/pool/英徽弥亮.jpg',
  'images/pool/蛇蟒之蛰.jpg',
  'images/pool/言简理直.jpg',
  'images/pool/谨司天英.jpg',
  'images/pool/身藏北斗.jpg',
  'images/pool/金相玉质.jpg',
  'images/pool/铁弦千钧.jpg',
  'images/pool/长生之术.jpg',
  'images/pool/风兴云蒸.jpg',
  'images/pool/辕门遣将.jpg',
  'images/attr/地属性.jpg',
  'images/attr/水属性.jpg',
  'images/attr/混沌属性.jpg',
  'images/attr/火属性.jpg',
  'images/attr/阳属性.jpg',
  'images/attr/阴属性.jpg',
  'images/attr/风属性.jpg',
  'images/home/平均出绝密次数上面的图片.jpg',
  'images/home/总招募次数上面的图片.jpg',
  'images/home/总绝密个数上面的图片.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CORE_CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CORE_CACHE && k !== IMG_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isImg(u) {
  return /\/images\/.+\.(jpg|jpeg|png|webp)$/i.test(u.pathname);
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let u;
  try { u = new URL(req.url); } catch (err) { return; }
  if (u.origin !== self.location.origin) return;

  // 图片：命中缓存**直接本地返回、不再联网**（旧实现即使命中也会在后台重新下载一遍，
  //       导致每次打开都在偷偷重下所有图）；未命中才联网并顺手存起来。
  //       缓存键统一用 pathname：页面重试时带的 ?retry=N 参数不会造成缓存永不命中。
  if (isImg(u)) {
    e.respondWith((async () => {
      const c = await caches.open(IMG_CACHE);
      const key = u.pathname;
      let hit = null;
      try { hit = (await c.match(req)) || (await c.match(key)); } catch (err) {}
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res && res.status === 200) { try { await c.put(key, res.clone()); } catch (err) {} }
        return res;
      } catch (err) {
        return hit || new Response('', { status: 504, statusText: 'offline' });
      }
    })());
    return;
  }

  // 页面 / 脚本：网络优先（保证能拿到新版本），断网时回退本地缓存
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.status === 200) {
        const copy = res.clone();
        caches.open(CORE_CACHE).then(c => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
  );
});

/* 后台预缓存全部图片：由页面 load 后 postMessage 触发，不抢首屏带宽 */
self.addEventListener('message', e => {
  if (!e.data || e.data.type !== 'PRECACHE') return;
  e.waitUntil((async () => {
    const c = await caches.open(IMG_CACHE);
    for (const p of IMAGES) {
      try {
        const hit = await c.match(p);
        if (!hit) await c.add(p);
      } catch (err) { /* 单张失败不影响其余 */ }
    }
  })());
});
