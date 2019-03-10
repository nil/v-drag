export const hashRE = /#.*$/;
export const extRE = /\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^(https?:|mailto:|tel:)/;

export function normalize(path) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '');
}

export function getHash(path) {
  const match = path.match(hashRE);
  if (match) {
    return match[0];
  }
  return null;
}

export function isExternal(path) {
  return outboundRE.test(path);
}

export function isMailto(path) {
  return /^mailto:/.test(path);
}

export function isTel(path) {
  return /^tel:/.test(path);
}

export function ensureExt(path) {
  if (isExternal(path)) {
    return path;
  }
  const hashMatch = path.match(hashRE);
  const hash = hashMatch ? hashMatch[0] : '';
  const normalized = normalize(path);

  if (endingSlashRE.test(normalized)) {
    return path;
  }
  return `${normalized}.html${hash}`;
}

export function isActive(route, path) {
  const routeHash = route.hash;
  const linkHash = getHash(path);
  if (linkHash && routeHash !== linkHash) {
    return false;
  }
  const routePath = normalize(route.path);
  const pagePath = normalize(path);
  return routePath === pagePath;
}

export function resolvePage(pages, rawPath, base) {
  if (base) {
    rawPath = resolvePath(rawPath, base);
  }
  const path = normalize(rawPath);
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].regularPath) === path) {
      return Object.assign({}, pages[i], {
        type: 'page',
        path: ensureExt(pages[i].path)
      });
    }
  }
  console.error(`[vuepress] No matching page found for sidebar item "${rawPath}"`);
  return {};
}


export function groupHeaders(headers) {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h));
  let lastH2;
  headers.forEach((h) => {
    if (h.level === 2) {
      lastH2 = h;
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h);
    }
  });
  return headers.filter(h => h.level === 2);
}

export function resolveNavLinkItem(linkItem) {
  return Object.assign(linkItem, {
    type: linkItem.items && linkItem.items.length ? 'links' : 'link'
  });
}
