export const hashRE = /#.*$/;
export const extRE = /\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^(https?:|mailto:|tel:)/;

function normalize(path) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '');
}

function isExternal(path) {
  return outboundRE.test(path);
}

function ensureExt(path) {
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

function groupHeaders(headers) {
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

/**
 * @param { Page } page
 * @returns { SidebarGroup }
 */
function resolveHeaders(page) {
  const headers = groupHeaders(page.headers || []);
  return [{
    type: 'group',
    collapsable: false,
    title: page.title,
    path: null,
    children: headers.map(h => ({
      type: 'auto',
      title: h.title,
      basePath: page.path,
      path: `${page.path}#${h.slug}`,
      children: h.children || []
    }))
  }];
}

function ensureEndingSlash(path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : `${path}/`;
}

/**
 * @param { Route } route
 * @param { Array<string|string[]> | Array<SidebarGroup> | [link: string]: SidebarConfig } config
 * @returns { base: string, config: SidebarConfig }
 */
export function resolveMatchingConfig(regularPath, config) {
  if (Array.isArray(config)) {
    return {
      base: '/',
      config
    };
  }
  for (const base in config) {
    if (ensureEndingSlash(regularPath).indexOf(base) === 0) {
      return {
        base,
        config: config[base]
      };
    }
  }
  return {};
}

function resolvePath(relative, base, append) {
  const firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  const stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/');
  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function resolvePage(pages, rawPath, base) {
  if (base) {
    rawPath = resolvePath(rawPath, base);
  }
  const path = normalize(rawPath);
  for (let i = 0; i < pages.length; i += 1) {
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

function resolveItem(item, pages, base, groupDepth = 1) {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base);
  } if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1]
    });
  }

  if (groupDepth > 3) {
    console.error(
      '[vuepress] detected a too deep nested sidebar group.'
    );
  }
  const children = item.children || [];
  if (children.length === 0 && item.path) {
    return Object.assign(resolvePage(pages, item.path, base), {
      title: item.title
    });
  }
  return {
    type: 'group',
    path: item.path,
    title: item.title,
    sidebarDepth: item.sidebarDepth,
    children: children.map(child => resolveItem(child, pages, base, groupDepth + 1)),
    collapsable: item.collapsable !== false
  };
}

/**
 * @param { Page } page
 * @param { string } regularPath
 * @param { SiteData } site
 * @param { string } localePath
 * @returns { SidebarGroup }
 */
export default function resolveSidebarItems(page, regularPath, site, localePath) {
  const {
    pages,
    themeConfig
  } = site;

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig;

  const pageSidebarConfig = page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar;
  if (pageSidebarConfig === 'auto') {
    return resolveHeaders(page);
  }

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar;
  if (!sidebarConfig) {
    return [];
  }
  const {
    base,
    config
  } = resolveMatchingConfig(regularPath, sidebarConfig);
  return config
    ? config.map(item => resolveItem(item, pages, base))
    : [];
}
