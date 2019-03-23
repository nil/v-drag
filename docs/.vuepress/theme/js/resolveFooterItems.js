function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

function findMatchingPage(pages, path) {
  let finalPath = path;

  if (!isExternal(path) && path.slice(-1) !== '/') {
    finalPath += '.html';
  }

  return pages.find(page => page.regularPath === finalPath);
}

function resolveLink(site, rawPath) {
  let path = {};

  if (typeof rawPath === 'object') {
    path = rawPath;
  } else {
    path = { link: rawPath };
  }

  const destinationPage = findMatchingPage(site.pages, path.link);

  if (isExternal(path.link) && !path.text) {
    throw Error(`[vuepress] Missing text for external link "${path.link}"`);
  }

  if (!isExternal(path.link) && !destinationPage) {
    throw Error(`[vuepress] No matching page found for footer link "${path.link}"`);
  }

  return {
    text: path.text || destinationPage.title,
    link: destinationPage ? destinationPage.regularPath : path.link
  };
}

export default function (site, locale) {
  const declaredItems = site.themeConfig.locales[locale].footer;

  return declaredItems.map(item => ({
    title: item.title,
    children: item.children.map(child => resolveLink(site, child))
  }));
}
