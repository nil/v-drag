export default function () {
  const { locales } = this.$site;
  const currentLink = this.$page.path;
  const routes = this.$router.options.routes;

  // List of locales and links
  return Object.keys(locales).map((path) => {
    const localeInfo = locales[path];
    const localeName = this.$site.locales[path].name;
    let localeLink;

    // Stay on the same page
    if (localeInfo.lang === this.$lang) {
      localeLink = currentLink;
    } else {
      // Change the language of the page
      localeLink = currentLink.replace(this.$localeConfig.path, path);

      // Fallback to homepage
      if (!routes.some(route => route.path === localeLink)) {
        localeLink = path;
      }
    }

    // Create object with text an link
    return {
      text: localeName,
      link: localeLink
    };
  });
}
