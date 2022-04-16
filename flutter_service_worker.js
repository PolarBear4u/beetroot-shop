'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "eed9219446bedbe1f8c4d72be5003319",
"assets/FontManifest.json": "082883c06ef8270446c1fca263ba0ce0",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/fonts/SourceSansPro-Regular.ttf": "47dbe5824a2d82b794ef1f52809699a5",
"assets/images/projekte/aixponic/aixponicsystem.jpg": "f38aadc6655def61d0c2fe341dd822d0",
"assets/images/projekte/aixponic/logo-q.png": "52ca225148ef2449e67b6d014fcb689b",
"assets/images/projekte/aixponic/logo-wide.svg": "0d0b15de259decc21546f4f2f5d58d55",
"assets/images/projekte/aquabonnik/K1600_IMG_7121.jpg": "48bf18dd1da747b8fc655d59dae7a306",
"assets/images/projekte/aquabonnik/logo.png": "93d0ed3fe6379f8f7bfe01d01ff15225",
"assets/images/projekte/blattsache/cropped-Logo-1024x227.png": "237f61c68148357ef83cddebefc940fc",
"assets/images/projekte/blattsache/logo-q.png": "698213f476aec350a49bf7d28433755b",
"assets/images/projekte/blattsache/Ueber-Uns-Fernsehturm-768x768.jpg": "42411d1f30fc0654225561ac04547a64",
"assets/images/projekte/pilzling/pilzling.png": "2e880f41d2fde3c07272388979157b50",
"assets/images/projekte/pilzling/pilzling_1x1.png": "21949d16e954ab6dd6cb6631cc5a8bb2",
"assets/images/projekte/pilzling/pilzling_logo.jpg": "402cee2204d8b7a4e2ecca4733383906",
"assets/images/projekte/pilzling/pilzling_pilz.jpg": "e83cad5dd9f6df13e1bc677a5037d8e7",
"assets/images/projekte/stadtgreens/MGs_Logo_gro%25C3%259F-8e76b797-112w.webp": "d4fb6420d994febb4d79e1594869d032",
"assets/images/projekte/stadtgreens/shutterstock_764208181-1920w.webp": "9b768c1354002c65ac4a93b24189c290",
"assets/images/projekte/urbanhive/Action_Kapsel_einsetzen_DSC02614_comp_750x.webp": "d7b263878d5ca1764677be36569b2f8f",
"assets/images/projekte/urbanhive/logo-q.png": "6b3bb744e2cf7c8a712a51b88360665c",
"assets/images/projekte/urbanhive/urbanhive_logo_white_samen_609176c8-8514-4941-966b-2d49bd45ee8a_140x.webp": "df20e73a03ab939a524624c07d48e0c1",
"assets/images/projekte/vollgepackt/pflanzen.webp": "32be0fdee5649875e300871b19749d1e",
"assets/images/projekte/vollgepackt/vollgepackt.jpg": "aa69daa0e72dab79ae89b76285cc2f64",
"assets/images/querbeet_logo.png": "5298672ec1489fedab6107096883989c",
"assets/images/querbeet_logo_q.png": "ba032e4dfc266e8e628ed483c2e59faa",
"assets/images/teamPhoto.jpeg": "398b392d28ab6d6a466ceec86b04aca1",
"assets/NOTICES": "2ceedb153a9ddf191c47e7cb8b46fda6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shopimages/apfel.jpeg": "62f0d34c9909095035afb3239713404f",
"assets/shopimages/kartoffeln.jpeg": "0d54e5ba8fbe3b9937302bc2e657743a",
"assets/shopimages/olla_pink_verkauf_q.jpeg": "7f031d4bcc98bea19752bb22b15bd977",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "6129028f9846a40393d55b4748e2ca68",
"/": "6129028f9846a40393d55b4748e2ca68",
"main.dart.js": "01f9297c48b1dc1605759547fdf35a28",
"manifest.json": "2e74cbd0c567e7e63203fbce94f00611",
"version.json": "a832f85949f36806a5c50388f9d473d3"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
