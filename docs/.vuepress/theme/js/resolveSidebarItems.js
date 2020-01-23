function resolveHeaders(page) {
  const headers = page.headers.filter(header => header.level <= 2);

  return headers.map(header => ({
    link: `${page.regularPath}#${header.slug}`,
    text: header.title
  }));
}

function resolveLink(path, pageList) {
  const correctedPath = path.match(/\/$/) ? path : `${path}.html`;

  return pageList.find(page => page.regularPath === correctedPath);
}

function generateLink(page) {
  return {
    type: 'link',
    link: page.regularPath,
    text: page.title,
    headers: page.headers ? resolveHeaders(page) : false
  };
}

export default function () {
  const userItems = this.$themeLocaleConfig.sidebar;
  let linkedChildren;

  return (userItems || []).map((item) => {
    // Link is defined only with its page
    if (typeof item === 'string') {
      const linkedPage = resolveLink(item, this.$site.pages);

      return generateLink(linkedPage);
    }

    // Link is declared using more information
    const linkedPage = resolveLink(item.link, this.$site.pages);

    if (item.title) {
      linkedChildren = item.children.map((child) => {
        const linkedChild = resolveLink(child, this.$site.pages);

        return generateLink(linkedChild);
      });
    }

    return {
      type: 'group',
      text: linkedPage.title || item.title,
      link: item.link,
      children: item.title ? linkedChildren : resolveHeaders(linkedPage)
    };
  });
}
